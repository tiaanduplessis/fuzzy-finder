import fuzzyFinder from '../src'

test('should be defined', () => {
  expect(fuzzyFinder).toBeDefined()
})

test('should return no results if none match', () => {
  const results = fuzzyFinder('foo', ['bar', 'baz', 'shoot'])
  expect(results.length).toBe(0)
})

test('should return matches with rank', () => {
  const result =fuzzyFinder('da', [
    'dota.js',
    'stratures.js',
    'structures.js',
    'database.db',
    'user-data.js',
    'dummy-data.txt',
    'other.js'
])
const firstMatch = result[0]

  expect(result.length).toBe(4)
  expect(result[0].match).toBeDefined()
})
