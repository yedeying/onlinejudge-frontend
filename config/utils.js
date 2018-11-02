const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const PostcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const Autoprefixer = require('autoprefixer');

function cssLoaders(options, useModule) {
  options = options || {};

  const cssLoader = {
    loader: useModule ? 'typings-for-css-modules-loader' : 'css-loader',
    options: {
      modules: useModule,
      namedExport: true,
      localIdentName: '[name]__[local]-[hash:base64:8]',
      minimize: process.env.NODE_ENV === 'production' && { safe: true },
      sourceMap: options.sourceMap,
      camelCase: true,
      importLoaders: 1
    }
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: options.sourceMap,
      plugins: () => [
        // PostcssFlexbugsFixes,
        Autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9' // React doesn't support IE8 anyway
          ],
          flexbox: 'no-2009'
        })
      ]
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader, postcssLoader];
    if (loader) {
      loaders.push({
        loader,
        options: Object.assign({
          sourceMap: options.sourceMap,
          javascriptEnabled: true
        }, loaderOptions)
      });
    }

    cssLoader.options.importLoaders = loaders.length - 1;

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader'
      });
    } else {
      return ['style-loader', ...loaders];
    }
  }

  return {
    css: generateLoaders(),
    less: generateLoaders('less-loader')
  };
}

exports.styleLoaders = function styleLoaders(options) {
  const output = [];
  // use this to disable cssModule
  // const loaders = cssLoaders(options, false);
  // for (const extension of Object.keys(loaders)) {
  //   output.push({
  //     test: new RegExp('\\.' + extension + '$'),
  //     use: loaders[extension]
  //   });
  // }
  for (const useModule of [false, true]) {
    const loaders = cssLoaders(options, useModule);
    for (const extension of Object.keys(loaders)) {
      output.push({
        test: new RegExp('\\.' + extension + '$'),
        [useModule ? 'exclude' : 'include']: /node_modules/,
        use: loaders[extension]
      });
    }
  }
  return output;
};

exports.svgLoaders = () => ([{
  loader: 'babel-loader'
}, {
  loader: 'clean-sketch-loader'
}, {
  loader: 'react-svg-loader',
  options: {
    jsx: true,
    svgo: {
      plugins: [{ removeTitle: true }],
      floatPrecision: 2
    }
  }
}]);
