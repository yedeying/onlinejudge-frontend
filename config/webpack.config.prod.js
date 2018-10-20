const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const WebpackVisualizerPlugin = require('webpack-visualizer-plugin');
const project = require('./project');
const utils = require('./utils');
const baseWebpackConfig = require('./webpack.config.base');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const htmlMinify = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true
};
const config = merge(baseWebpackConfig, {
  mode: 'production',
  bail: true,
  output: {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  module: {
    rules: utils.styleLoaders({ extract: true })
  },
  plugins: [
    // 用于分析node_modules
    // new WebpackVisualizerPlugin({
    //   filename: 'visualizer.html'
    // }),
    new HtmlWebpackPlugin({
      inject: true,
      template: project.paths.public('index.html'),
      favicon: project.paths.favicon,
      filename: project.paths.template('index.html'),
      minify: htmlMinify,
      chunks: ['manifest', 'vendor', 'app']
    }),
    new ParallelUglifyPlugin({
      exclude: /\.min\.js$/,
      sourceMap: true,
      uglifyJS: {
        mangle: true,
        output: {
          comments: false
        },
        compress: {
          drop_console: true,
          drop_debugger: true,
          warnings: false,
          reduce_vars: false
        }
      }
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name]-[hash].css',
      allChunks: true
    })
  ]
});

// 分析所有生成的静态资源里面，哪些资源是比较臃肿的
// 也可以判断新加进来的包，是否合适
if (project.bundleAnalyzerReport) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
