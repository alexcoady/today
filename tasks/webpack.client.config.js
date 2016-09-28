var path = require('path');

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
      }]
    },
    target: 'web',
    devServer: {
      port: 8082,
      host: '0.0.0.0',
      inline: true,
      historyApiFallback: true
    },
  };
}
