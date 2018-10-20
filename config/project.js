const path = require('path');
const fs = require('fs');
const debug = require('debug')('app:config:project');
const argv = require('yargs').argv;

debug('Creating default configuration.');
// ========================================================
// Default Configuration
// ========================================================
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const config = {
  resolveApp,
  env: process.env.NODE_ENV || 'development',
  bundleAnalyzerReport: process.env.npm_config_report,

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  client: 'src',
  path_base: appDirectory,
  dir_client: 'src',
  node_modules: 'node_modules',
  dir_dist: 'output/resource',
  dir_template: 'output/template',
  dir_public: 'public',
  dir_server: 'server',
  served_path: '/',

  /* alias规范： 后面新添加的alias以添加$为前缀 */

  alias: {
    $root: resolveApp('src'),
    /* Services */
    $services: resolveApp('src/services'),
    /* redux */
    $store: resolveApp('src/redux/store'),
    $actions: resolveApp('src/redux/actions'),
    $reducers: resolveApp('src/redux/reducers'),
    $selectors: resolveApp('src/redux/selectors'),
    $sagas: resolveApp('src/redux/sagas'),
    $middlewares: resolveApp('src/redux/middlewares'),
    /* 辅助 */
    $helpers: resolveApp('src/helpers'),
    $utils: resolveApp('src/utils'),
    /* 配置 */
    $constants: resolveApp('src/constants'),
    /* 资源 */
    assets: resolveApp('src/assets'), // 特殊：在less中不允许$符
    $assets: resolveApp('src/assets'),
    /* 样式 */
    styles: resolveApp('src/styles'), // 特殊：在less中不允许$符
    $styles: resolveApp('src/styles'),
    /* 公共组件 */
    $components: resolveApp('src/components')
  },

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: process.env.HOST || '0.0.0.0',
  server_port: parseInt(process.env.PORT, 10) || 4001,

  // ----------------------------------
  // html plugin Structure
  // ----------------------------------
  html_env: 'development',

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_devtool: 'cheap-module-eval-source-map',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_reporters: [
    { type: 'text-summary' },
    { type: 'lcov', dir: 'coverage' }
  ]
};

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(config.env),
    CDN_URL: JSON.stringify(config.served_path.substr(0, config.served_path.length - 1))
  },
  NODE_ENV: config.env,
  __DEV__: config.env === 'development',
  __PROD__: config.env === 'production',
  __TEST__: config.env === 'test',
  __COVERAGE__: !argv.watch && config.env === 'test',
  __BASENAME__: JSON.stringify(process.env.BASENAME || '')
};

// ------------------------------------
// Utilities
// ------------------------------------
function base(...args) {
  return path.resolve(config.path_base, ...args);
}

config.paths = {
  base,
  client: base.bind(null, config.client),
  node_modules: base.bind(null, config.node_modules),
  public: base.bind(null, config.dir_public),
  dist: base.bind(null, config.dir_dist),
  template: base.bind(null, config.dir_template),
  favicon: base(config.dir_public, 'favicon.ico'),
  inline_icons: base.bind(null, 'src/assets/icons/svgs/inline'),
  raw_icons: base.bind(null, 'src/assets/icons/svgs/raw')
};

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`);
const environments = require('./environments');
const overrides = environments[config.env];
if (overrides) {
  debug('Found overrides, applying to default configuration.');
  Object.assign(config, overrides(config));
} else {
  debug('No environment overrides found, defaults will be used.');
}

module.exports = config;
