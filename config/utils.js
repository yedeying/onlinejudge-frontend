const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const PostcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const Autoprefixer = require('autoprefixer');

function cssLoaders(options, useModule) {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
      localsConvention: 'camelCaseOnly',
      importLoaders: 1,
      esModule: true
    }
  };

  if (useModule) {
    cssLoader.options.modules = {
      mode: 'local',
      localIdentName: '[name]__[local]-[hash:base64:8]'
    };
  }

  const cssTypingLoader = {
    loader: '@teamsupercell/typings-for-css-modules-loader'
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: options.sourceMap,
      plugins: () => [
        // PostcssFlexbugsFixes,
        Autoprefixer({
          flexbox: 'no-2009'
        })
      ]
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = [
      cssLoader,
      useModule ? cssTypingLoader : null,
      postcssLoader,
      loader ? {
        loader,
        options: Object.assign({
          sourceMap: options.sourceMap,
          javascriptEnabled: true
        }, loaderOptions)
      } : null
    ].filter(loader => loader);

    cssLoader.options.importLoaders = loaders.length - 1;

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
