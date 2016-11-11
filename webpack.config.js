var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'docs');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    root: [
      APP_DIR,
    ],
  },

  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'assets/bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.s?css$/,
        include: APP_DIR,
        loaders: [
          'style',
          'css',
          'sass',
          'sass-resources',
        ],
      },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: 'file-loader' },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file',
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      React: 'react',

      Tether: 'tether',
      'window.Tether': 'tether',
      Alert: 'exports?Alert!bootstrap/js/dist/alert',
      Button: 'exports?Button!bootstrap/js/dist/button',
      Carousel: 'exports?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports?Modal!bootstrap/js/dist/modal',
      Popover: 'exports?Popover!bootstrap/js/dist/popover',
      Scrollspy: 'exports?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports?Tab!bootstrap/js/dist/tab',
      Tooltip: 'exports?Tooltip!bootstrap/js/dist/tooltip',
      Util: 'exports?Util!bootstrap/js/dist/util',
    }),
    new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin()
  ],

  sassResources: './src/styles/shared.scss',
};

module.exports = config;

