const assert = require('node:assert/strict')
const { readFileSync, writeFileSync, unlinkSync } = require('node:fs')
const { randomUUID } = require('node:crypto')
const { dirname, join, resolve } = require('node:path')
const { createRequire } = require('node:module')
const { pathToFileURL } = require('node:url')
const vm = require('node:vm')
const { test } = require('node:test')

// The same suite can run against an isolated installation of the packed package.
const root = resolve(process.env.FUZZY_FINDER_PACKAGE_ROOT || join(__dirname, '..'))
const packageRequire = createRequire(join(root, 'package.json'))
const manifest = packageRequire('./package.json')
const escape = packageRequire('escape-string-regexp')

function characterize (name, fuzzyFinder, register = test) {
  const pending = []
  const check = (...args) => pending.push(register(...args))
  check(`${name}: exports a function with unchanged defaults`, () => {
    assert.equal(typeof fuzzyFinder, 'function')
    // The existing distributed build exposes two formal parameters.
    assert.equal(fuzzyFinder.length, 2)
    assert.deepEqual(fuzzyFinder(), [])
    assert.deepEqual(fuzzyFinder('abc'), [])
    assert.deepEqual(fuzzyFinder(undefined, ['a', '']), [
      { match: 'a', rank: 0 }, { match: '', rank: 0 }
    ])
  })

  check(`${name}: returns the complete ranked example in candidate order`, () => {
    assert.deepEqual(fuzzyFinder('da', [
      'dota.js', 'stratures.js', 'structures.js', 'database.db',
      'user-data.js', 'dummy-data.txt', 'other.js'
    ]), [
      { match: 'dota.js', rank: 0 },
      { match: 'database.db', rank: 0 },
      { match: 'user-data.js', rank: 5 },
      { match: 'dummy-data.txt', rank: 0 }
    ])
  })

  check(`${name}: is case-sensitive and permits gaps but not reversed letters`, () => {
    assert.deepEqual(fuzzyFinder('ab', ['a-b', 'AB', 'ba', 'xaxb', 'ab', 'ac']), [
      { match: 'a-b', rank: 0 }, { match: 'xaxb', rank: 1 }, { match: 'ab', rank: 0 }
    ])
    assert.deepEqual(fuzzyFinder('foo', ['bar', 'baz', 'shoot']), [])
  })

  check(`${name}: keeps duplicates, input order and the original input`, () => {
    const candidates = Object.freeze(['xxab', 'ab', 'ab'])
    assert.deepEqual(fuzzyFinder('ab', candidates), [
      { match: 'xxab', rank: 2 }, { match: 'ab', rank: 0 }, { match: 'ab', rank: 0 }
    ])
    assert.deepEqual(candidates, ['xxab', 'ab', 'ab'])
  })

  check(`${name}: handles empty queries and Unicode UTF-16 offsets`, () => {
    assert.deepEqual(fuzzyFinder('', ['', 'a']), [
      { match: '', rank: 0 }, { match: 'a', rank: 0 }
    ])
    assert.deepEqual(fuzzyFinder('é', ['café', 'cafe']), [{ match: 'café', rank: 3 }])
    assert.deepEqual(fuzzyFinder('a', ['🙂a']), [{ match: '🙂a', rank: 2 }])
    assert.deepEqual(fuzzyFinder('🙂', ['x🙂']), [{ match: 'x🙂', rank: 1 }])
  })

  check(`${name}: retains line-break and candidate-coercion behavior`, () => {
    assert.deepEqual(fuzzyFinder('ab', ['a\nb', '\nab']), [{ match: '\nab', rank: 1 }])
    assert.deepEqual(fuzzyFinder('2', [123, 'abc']), [{ match: 123, rank: 1 }])
    assert.deepEqual(fuzzyFinder('null', [null]), [{ match: null, rank: 0 }])
  })

  check(`${name}: retains existing invalid-input errors`, () => {
    for (const query of [null, 123, {}, []]) {
      assert.throws(() => fuzzyFinder(query, []), { name: 'TypeError' })
    }
    assert.throws(() => fuzzyFinder('a', null), { name: 'TypeError' })
    assert.throws(() => fuzzyFinder('a', {}), { name: 'TypeError' })
  })

  check(`${name}: characterizes existing escaped-punctuation errors`, () => {
    // These are pre-existing errors in 1.0.4, not newly supported query syntax.
    // Keep the tooling refresh separate from a future escaping bug fix.
    for (const query of ['.', '*', '+', '?', '^', '$', '{', '}', '(', ')', '|', '[', ']', '\\', 'a.b', 'a\\b']) {
      assert.throws(() => fuzzyFinder(query, [query]), { name: 'SyntaxError' }, query)
    }
  })
  return Promise.all(pending)
}

characterize('CommonJS package entry', packageRequire(root))
characterize('UMD CommonJS', packageRequire(join(root, manifest['umd:main'])))

function loadUmd (context) {
  vm.runInNewContext(readFileSync(join(root, manifest['umd:main']), 'utf8'), context)
}

// Normalize cross-realm result objects without changing values or thrown errors.
function sameRealm (fuzzyFinder) {
  return function (query, candidates) {
    return Array.from(fuzzyFinder(query, candidates), result => ({ ...result }))
  }
}

test('UMD retains wrapped default-export dependency support', () => {
  const wrapped = { escape: { default: escape } }
  loadUmd(wrapped)
  assert.deepEqual(sameRealm(wrapped.fuzzyFinder)('ab', ['ab']), [{ match: 'ab', rank: 0 }])
})

const browser = { escape }
loadUmd(browser)
characterize('UMD browser global', sameRealm(browser.fuzzyFinder))

let amdExport
const amd = {
  define (dependencies, factory) {
    assert.deepEqual(Array.from(dependencies), ['escape-string-regexp'])
    amdExport = factory(escape)
  }
}
amd.define.amd = {}
loadUmd(amd)
characterize('UMD AMD', sameRealm(amdExport))

test('ES module entry', async (t) => {
  // The historical .m.js path is intended for bundlers. Copy its bytes beside
  // the original with an unambiguous extension for Node's native ESM loader.
  const modulePath = join(root, manifest.module)
  const temporary = join(dirname(modulePath), `.fuzzy-finder-test-${randomUUID()}.mjs`)
  writeFileSync(temporary, readFileSync(modulePath))
  try {
    const { default: fuzzyFinder } = await import(pathToFileURL(temporary).href)
    await characterize('ES module', fuzzyFinder, t.test.bind(t))
  } finally {
    unlinkSync(temporary)
  }
})

test('all distribution source maps retain the original source', () => {
  for (const file of [manifest.main, manifest.module, manifest['umd:main']]) {
    const map = JSON.parse(readFileSync(join(root, `${file}.map`), 'utf8'))
    assert.equal(map.version, 3)
    assert.ok(map.sources.some(source => source.endsWith('src/index.js')))
    assert.ok(map.sourcesContent.some(source => source.includes('const fuzzyFinder')))
    assert.ok(map.mappings.length > 0)
  }
})
