var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpack = require("webpack");
var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "docs");
var APP_DIR = path.resolve(__dirname, "src");

var config = {
  entry: [ APP_DIR + "/index.jsx", 'bootstrap-loader' ],
  output: {
    path: BUILD_DIR,
    filename: "assets/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: "babel",
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader"
        )
      },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      React: "react",
      _: "lodash",

      Tether: "tether",
      "window.Tether": "tether",
      Alert: "exports?Alert!bootstrap/js/dist/alert",
      Button: "exports?Button!bootstrap/js/dist/button",
      Carousel: "exports?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports?Modal!bootstrap/js/dist/modal",
      Popover: "exports?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports?Util!bootstrap/js/dist/util",
    }),
    new ExtractTextPlugin("assets/bundle.css")
  ]
};

module.exports = config;

