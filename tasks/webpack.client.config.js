var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var postcssCalc = require('postcss-calc');

module.exports = function () {

  return {
    entry: [
      path.resolve(__dirname, './../client/src/index.jsx')
    ],
    output: {
      'path': path.resolve(__dirname, './../client/build'),
      'filename': 'bundle.js',
      'publicPath': 'build/'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      loaders: [{
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel'
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]-[local]--[hash:base64:5]!postcss')
      }]
    },
    plugins: [
      new ExtractTextPlugin('style.css'),
      new webpack.LoaderOptionsPlugin({
        test: /\.css$/,
        options: {
          postcss: [
            postcssCalc
          ]
        }
      })
    ],
    target: 'web'
  };
}
