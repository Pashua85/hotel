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
    entry: {
      'index': PATHS.source + '/pages/index/index.js',
      // 'search-room': PATHS.source + '/pages/search-room/search-room.js'
    },
    output: {
      path: PATHS.build,
      filename: './js/[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunk: ['index'],
        template: PATHS.source + '/pages/index/index.pug',
      }),
      new HtmlWebpackPlugin({
        filename: 'search-room.html',
        chunk: ['search-room'],
        template: PATHS.source + '/pages/search-room/search-room.pug',
      }),
      new HtmlWebpackPlugin({
        filename: 'details.html',
        chunk: ['details'],
        template: PATHS.source + '/pages/details/details.pug',
      }),
      new HtmlWebpackPlugin({
        filename: 'register.html',
        chunk: ['register'],
        template: PATHS.source + '/pages/register/register.pug',
      }),
      new HtmlWebpackPlugin({
        filename: 'sign-in.html',
        chunk: ['sing-in'],
        template: PATHS.source + '/pages/sign-in/sign-in.pug',
      }),
      new HtmlWebpackPlugin({
        filename: 'empty-page.html',
        chunk: ['empty-page'],
        template: PATHS.source + '/pages/empty-page/empty-page.pug',
      }),
      new HtmlWebpackPlugin({
        filename: 'ui-colors-type.html',
        chunk: ['empty-page'],
        template: PATHS.source + '/ui-pages/ui-colors-type/ui-colors-type.pug',
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