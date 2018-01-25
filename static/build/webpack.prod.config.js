var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.config');
const ManifestPlugin = require('webpack-manifest-plugin');
module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development
  output: {
    publicPath: '/static/output/dist/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
    new ManifestPlugin({
      publicPath: '/output/dist/',
      basePath: '',
      writeToFileEmit: true
    }),
  ]
})