var path = require('path');
var webpack = require('webpack');

module.exports = {

  //fastest rebuild and build speed
  devtool: 'eval', 
  entry: [
    //for hot style updates
    'webpack/hot/dev-server',
    //refreshes the browser when it can't hot update
    'webpack-dev-server/client?http://localhost:8080', 
    //our entry point
    './index.js' 
  ],
  output: {
    path: path.join(__dirname, 'public', 'build'),
    filename: 'bundle.js',
    publicPath: '/build/' //the server will listen in on this path and then proxy Webpack
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?presets[]=react,presets[]=es2015',
        exclude: '/node_modules'
      },
      //This converts our .css into JS
      { test: /\.s?css$/, loaders: ['style', 'css', 'sass'] },
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
  //Since we're running Webpack from our server, need to manually add the
  //Hot Replacement plugin
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};