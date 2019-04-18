const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const fonts = require('./webpack/fonts');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
const css = require('./webpack/css');
const sourceMap = require('./webpack/sourceMap');
const images = require('./webpack/images');
const babel = require('./webpack/babel');
const favicon = require('./webpack/favicon');

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
};

const common = merge([
  {
    entry: PATHS.source + '/app.js',
    output: {
      path: PATHS.build,
      filename: './js/[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: PATHS.source + '/index.pug',
      })
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          'common': {
            minChunks: 2,
            chunks: 'all',
            name: 'common',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
    
  },
  pug(),
  fonts(),
  images(),
  babel(),
]);

module.exports = function(env, argv) {
  if (argv.mode === 'production') {
    return merge([
      common,
      extractCSS(),
      favicon(),
    ]);
  }
  if (argv.mode === 'development') {
    return merge([
      common,
      devserver(),
      sass(),
      css(),
      sourceMap(),
    ]);
  }
};