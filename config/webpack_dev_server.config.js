const config = require('./webpack.config.dev');
const project = require('./project');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

process.noDeprecation = true;

module.exports = function(allowedHost) {
  return {
    index: '',
    // Enable gzip compression of generated files.
    compress: true,
    clientLogLevel: 'none',
    contentBase: project.paths.public(),
    watchContentBase: true,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    },
    disableHostCheck: true,
    https: protocol === 'https',
    host: project.server_host,
    historyApiFallback: {
      disableDotRule: true
    },
    public: allowedHost
  };
};
