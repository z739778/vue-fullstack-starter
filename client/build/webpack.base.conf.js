var path = require('path')
var config = require('../../config').frontend
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    path: config.assetsRoot,
    publicPath: config.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'resources': path.resolve(__dirname, '../src/resources')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../../node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader:'eslint-loader',
        enforce: "pre",
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader:'eslint-loader',
        enforce: "pre",
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader:'vue-loader',
      },
      {
        test: /\.js$/,
        loader:'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader:'json-loader',
      },
      {
        test: /\.html$/,
        loader:'vue-html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }  
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }  
      }
    ]
  }
}
