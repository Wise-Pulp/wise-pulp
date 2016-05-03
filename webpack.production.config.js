var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');

var config = {

  sassLoaders: [
    'css-loader',
    'postcss-loader',
    'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, 'public', 'build');
  ],
  // We change to normal source mapping
  devtool: 'source-map',
  entry: './index.js',
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('[name].css')
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?presets[]=react,presets[]=es2015',
        exclude: '/node_modules'
      },
      //This converts our .css into JS
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')) },
      { test : /\.json$/, loader: 'json-loader'},
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader:'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      {test: /\.(png|jpg)$/, loader: 'url?limit=25000'}
    ]
  },

  resolve: {
      extensions: ['', '.js', '.jsx', '.css', '.scss', '.json'],
      modulesDirectories: [
        'node_modules'
      ]        
  },
};

module.exports = config;