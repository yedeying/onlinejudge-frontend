// Here is where you can define configuration overrides based on the execution environment.
// Supply a key to the default export matching the NODE_ENV that you wish to target, and
// the base configuration will apply your overrides before exporting itself.

module.exports = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  // NOTE: In development, we use an explicit public path when the assets
  // are served webpack by to fix this issue:
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  development: config => {
    return {
    };
  },

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // mersea public_path: /static/mobile/
  // express public_path: /resource/os_mobile/
  // cdn public_path: //s3a.pstatp.com/cg_growth/resource/os_mobile/
  // ======================================================
  production: config => ({
    compiler_base_route: '/',
    compiler_fail_on_warning: false,
    compiler_devtool: false,
    compiler_stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  })
};
