const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const project = require('./project');
const utils = require('./utils');
const baseWebpackConfig = require('./webpack.config.base');

const commonChunks = ['manifest', 'vendor'];
const config = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    pathinfo: true,
    filename: 'js/[name]-[hash:8].js',
    chunkFilename: 'js/[name]-[hash:8].js'
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: false })
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: project.paths.client('index.html'),
      filename: 'index.html',
      favicon: project.paths.favicon,
      chunksSortMode: 'manual',
      chunks: [...commonChunks, 'app']
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new WatchMissingNodeModulesPlugin(project.paths.node_modules())
  ],
  performance: {
    hints: false
  }
});

if (project.bundleAnalyzerReport) {
  const Jarvis = require('webpack-jarvis');
  config.plugins.push(new Jarvis());
}

module.exports = config;
