const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config');
const ManifestPlugin = require('webpack-manifest-plugin');


const cssModulesQuery = {
  modules: true,
  importLoaders: 1,
  localIdentName: '[local]-[hash:base64:5]'
};
module.exports = merge(baseWebpackConfig, {

  devtool: 'source-map',
  entry: {
    'hot': 'webpack/hot/only-dev-server',
    'devServerClient': 'webpack-dev-server/client?http://0.0.0.0:5000',
  },
  output: {
    publicPath: 'http://localhost:5000/output/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
    new ManifestPlugin({
      writeToFileEmit: true,
      publicPath: 'http://localhost:5000/output/'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /^.((?!cssmodule).*\.less)/,
        loaders: [
          {loader: "style-loader"},
          {
            loader: 'css-loader',
            query: cssModulesQuery
          },
          {loader: "less-loader"}
        ]
      }
    ]
  },
  devServer: {
    publicPath: '/output/',
    host: '0.0.0.0',
    port: "5000",
    hot: true,
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})



