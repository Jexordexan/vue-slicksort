var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [ './index.js' ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body', // Inject all scripts into the body
    }),
  ],
  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      'vue': 'vue/dist/vue.common.js',
    },
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /(\.scss)$/,
        loaders: [
          'style-loader', 
          'css-laoder?sourceMap&modules&importLoaders=1&localIdentName=Cal__[name]__[local]',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /(\.css)$/,
        loaders: [
          'style-loader', 
          'postcss-loader', 
          'css-loader'],
      },
    ],
  },
};
