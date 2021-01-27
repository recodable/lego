import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.js',
  output: {
    format: 'iife',
    name: 'App', // Name of the class we will call on the page
    file: 'dist/like-button.js', // the file which we will include on the page
  },
  plugins: [
    svelte({
      emitCss: false, // Let's store CSS in JS (no-depends), but you can emit it in separate *.css file too
    }),
    resolve({
      browser: true,
      dedupe: (importee) =>
        importee === 'svelte' || importee.startsWith('svelte/'),
    }),
    commonjs(),
    terser(),
  ],
};
