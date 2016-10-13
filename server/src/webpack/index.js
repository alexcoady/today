import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigFn from './../../../tasks/webpack.client.config.js';

const webpackConfig = webpackConfigFn();
const compiler = webpack(webpackConfig);

export const devMiddleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  stats: {
    colors: true
  },
  publicPath: `/${webpackConfig.output.publicPath}`
});

export const hotMiddleware = webpackHotMiddleware(compiler);
