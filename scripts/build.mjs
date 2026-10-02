import { mkdir, writeFile } from 'node:fs/promises'
import { basename } from 'node:path'
import { babel } from '@rollup/plugin-babel'
import { rollup } from 'rollup'
import { minify } from 'terser'

const bundle = await rollup({
  input: 'src/index.js',
  external: ['escape-string-regexp'],
  plugins: [babel({
    babelHelpers: 'bundled',
    babelrc: false,
    configFile: false,
    assumptions: { ignoreFunctionLength: true, ignoreToPrimitiveHint: true },
    presets: [['@babel/preset-env', { targets: { ie: '11' }, modules: false }]]
  })]
})

try {
  await mkdir('dist', { recursive: true })
  for (const [format, file] of [
    ['cjs', 'dist/fuzzy-finder.js'],
    ['es', 'dist/fuzzy-finder.m.js'],
    ['umd', 'dist/fuzzy-finder.umd.js']
  ]) {
    const { output } = await bundle.generate({
      format,
      file,
      name: 'fuzzyFinder',
      exports: 'default',
      interop: 'compat',
      globals: { 'escape-string-regexp': 'escape' },
      generatedCode: 'es5',
      sourcemap: true
    })
    const result = await minify(output[0].code, {
      ecma: 5,
      toplevel: true,
      compress: { passes: 2 },
      module: format === 'es',
      sourceMap: {
        content: output[0].map.toString(),
        filename: basename(file),
        url: `${basename(file)}.map`
      }
    })
    await writeFile(file, `${result.code}\n`)
    await writeFile(`${file}.map`, `${result.map}\n`)
  }
} finally {
  await bundle.close()
}
