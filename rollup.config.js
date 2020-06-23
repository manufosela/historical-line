import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import {
  terser
} from 'rollup-plugin-terser';

export default {
  preserveSymlinks: true,
  input: [ 'historical-line.js' ],
  output: {
    file: 'build/historical-line.min.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),
    babel(),
    terser({
      output: {
        comments: false
      },
    })
  ]
};