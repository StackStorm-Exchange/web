var ExtractTextPlugin = require("extract-text-webpack-plugin");

var webpack = require("webpack");
var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "docs");
var APP_DIR = path.resolve(__dirname, "src");

var config = {
  entry: APP_DIR + "/index.jsx",
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
        test: /\.css$/,
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
      React: "react",
    }),
    new ExtractTextPlugin("assets/bundle.css")
  ]
};

module.exports = config;

