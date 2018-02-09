const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const sourcePath = path.join(__dirname, './static/src');
const outputPath = path.join(__dirname, './../output/dist/');


module.exports = {
  entry: {
    'adminLoginPage' : './static/src/pages/admin/adminLoginPage.js',
    'userManagePage' : './static/src/pages/admin/userManagePage.js',
    'goodsManagePage' : './static/src/pages/admin/goodsManagePage.js',
    'wantsManagePage' : './static/src/pages/admin/wantsManagePage.js',
    'test' : './static/src/pages/admin/test.js',
    'work' : './static/src/pages/work.js',
    'index' : './static/src/pages/index.js',
    'error' : './static/src/pages/error.js',
    vendor: ['react', 'react-dom', 'whatwg-fetch'],
  },
  output: {
    path: outputPath,
    // publicPath: '/static/output/dist/',
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader/webpack', 'babel-loader']
      },
      {
        test: /\.(svg|png|jpeg)$/,
        loaders: ['url-loader?limit=10000&mimetype=image/svg+xml']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      sourcePath,
      'node_modules'
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity,
      filename: 'js/[name].js'
    }),
  ],

};