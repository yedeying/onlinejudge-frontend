const webpack = require('webpack');
const project = require('./project');
const utils = require('./utils');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  devtool: project.compiler_devtool,
  entry: {
    app: [project.paths.client('index.tsx')]
  },
  output: {
    path: project.paths.dist(),
    publicPath: project.served_path
  },
  resolve: {
    modules: [project.paths.client(), project.paths.node_modules()],
    extensions: ['.ts', '.tsx', '.js', '.jsx', 'json'],
    alias: project.alias
  },
  module: {
    strictExportPresence: true,
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: 'babel-loader',
        options: { cacheDirectory: true }
      }, {
        loader: 'ts-loader'
      }]
    }, {
      test: /\.worker\.js$/,
      use: {
        loader: 'worker-loader',
        options: {
          inline: true
        }
      }
    }, {
      test: /\.jsx?$/,
      exclude: [/node_modules/, /\.min\.js/],
      use: {
        loader: 'babel-loader',
        options: { cacheDirectory: true }
      }
    }, {
      test: /\.svg$/,
      oneOf: [{
        resourceQuery: /clean/,
        use: utils.svgLoaders()
      }, {
        include: [project.paths.raw_icons()],
        use: 'raw-loader'
      }, {
        include: [project.paths.inline_icons()],
        use: utils.svgLoaders()
      }, {
        resourceQuery: /react/,
        use: utils.svgLoaders()
      }, {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]'
        }
      }]
    }, {
      test: /\.(bmp|gif|jpe?g|png)$/,
      loader: 'url-loader',
      exclude: [project.paths.public(), project.paths.inline_icons(), project.paths.raw_icons()],
      options: {
        limit: 20000,
        name: 'images/[name].[ext]'
      }
    }, {
      test: /\.(otf|eot|ttf|woff2?)$/,
      loader: 'url-loader',
      options: {
        limit: 20000,
        name: 'fonts/[name].[ext]'
      }
    }, {
      include: project.paths.public(),
      use: {
        loader: 'file-loader',
        options: {
          limit: 0,
          name: '[path][name].[ext]'
        }
      }
    }, {
      test: /\.html$/,
      use: 'raw-loader'
    }]
  },
  stats: {
    version: false,
    source: false,
    reasons: false,
    modules: false,
    hash: false,
    timings: false,
    chunkOrigins: false,
    cachedAssets: false,
    moduleTrace: false,
    children: false,
    chunks: false
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          minChunks: 1,
          test(chunks) {
            if (/\.(css|less)$/.test(chunks)) {
              return false;
            }
            return /node_modules/.test(chunks);
          }
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin(project.globals),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '../tsconfig.json') })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
