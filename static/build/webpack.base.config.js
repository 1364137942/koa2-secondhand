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
    'indexPage' : './static/src/pages/index/indexPage.js',
    'editGoodPage' : './static/src/pages/index/editGoodPage.js',
    'goodDetailPage' : './static/src/pages/index/goodDetailPage.js',
    'wantsListPage' : './static/src/pages/index/wantsListPage.js',
    'wantDetailPage': './static/src/pages/index/wantDetailPage.js',
    'editWantPage': './static/src/pages/index/editWantPage.js',
    'loginPage': './static/src/pages/index/loginPage.js',
    'registerPage': './static/src/pages/index/registerPage.js',
    'userCenterPage': './static/src/pages/index/userCenterPage.js',
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
        test: /\.(svg|png|jpeg|jpg)$/,
        loaders: ['url-loader?limit=10000']
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        exclude: /node_modules/,
        loader: "file-loader"
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
      filename: 'js/[name].js',
      children:true,
      minChunks: 2
    }),
  ],

};