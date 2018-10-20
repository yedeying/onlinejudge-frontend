const HappyPack = require('happypack');
const os = require('os');
const isRunningTest = process.env.APP_ENV === 'testing' && process.platform === 'linux';
const happyThreadPool = HappyPack.ThreadPool({ size: isRunningTest ? 1 : os.cpus().length });
const plugins = [
  new HappyPack({
    id: 'babel',
    threadPool: happyThreadPool,
    loaders: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  }),
  new HappyPack({
    id: 'raw',
    threadPool: happyThreadPool,
    loaders: [
      {
        loader: 'raw-loader'
      }
    ]
  }),
  new HappyPack({
    id: 'file',
    threadPool: happyThreadPool,
    loaders: [
      {
        loader: 'file-loader',
        options: {
          limit: 0,
          name: '[path][name].[ext]'
        }
      }
    ]
  }),
  new HappyPack({
    id: 'urlFont',
    threadPool: happyThreadPool,
    loaders: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  }),
  new HappyPack({
    id: 'worker',
    threadPool: happyThreadPool,
    loaders: [
      {
        loader: 'worker-loader',
        options: {
          inline: true
        }
      }
    ]
  }),
  new HappyPack({
    id: 'urlImage',
    threadPool: happyThreadPool,
    loaders: [
      {
        loader: 'url-loader',
        options: {
          limit: 20000,
          name: 'images/[name].[ext]'
        }
      }
    ]
  }),
  new HappyPack({
    id: 'ts',
    threadPool: happyThreadPool,
    loaders: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      {
        loader: 'ts-loader',
        options: {
          happyPackMode: true
        }
      }
    ]
  }),
  new HappyPack({
    id: 'svg',
    threadPool: happyThreadPool,
    loaders: [
      {
        loader: 'babel-loader'
      },
      {
        loader: 'react-svg-loader',
        options: {
          jsx: true,
          svgo: {
            plugins: [
              {
                removeTitle: true,
                removeXMLProcInst: true,
                removeComments: true,
                removeMetadata: true,
                removeXMLNS: true,
                removeUselessDefs: true,
                removeEditorsNSData: true,
                removeEmptyAttrs: true,
                removeHiddenElems: true,
                convertShapeToPath: true,
                removeScriptElement: true
              }
            ],
            floatPrecision: 2
          }
        }
      }
    ]
  })
];
module.exports = plugins;
