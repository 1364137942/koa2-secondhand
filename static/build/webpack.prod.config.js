const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssModulesQuery = {
  modules: true,
  importLoaders: 1,
  localIdentName: '[local]-[hash:base64:5]'
};
module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development
  output: {
    publicPath: '/static/output/dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader']
        }),
      },
      {
        test: /^.((?!cssmodule).*\.less)/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: 'css-loader',
            query: cssModulesQuery
          },
            {
              loader: 'less-loader'
            }]
        })
      }
    ]
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