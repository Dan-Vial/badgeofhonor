import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import copy from 'rollup-plugin-copy'
// import { nodeResolve } from '@rollup/plugin-node-resolve'
// import alias from '@rollup/plugin-alias'
// import { join, dirname, resolve } from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = join(dirname(__filename))

export default {
  input: ['./src/bin/www.ts', './src/bin/cron.ts'],
  output: {
    dir: 'dist'
  },
  plugins: [
    // alias({
    //   entries: [
    //     { find: '@', replacement: resolve(__dirname, './src') },
    //     { find: '@public', replacement: resolve(__dirname, './src/public') }
    //   ]
    // }),
    // nodeResolve(),
    json(),
    commonjs(),
    typescript(),
    terser({ module: true, output: { comments: 'some' } }),
    copy({
      targets: [
        { src: ['package.json', '.env', 'loader_CJS_to_ESM.cjs', 'src/public'], dest: 'dist' }
      ]
    })
  ]
}
