const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: [ './index.js' ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  devServer: {
    port: 3000,
    contentBase: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body', // Inject all scripts into the body
    }),
  ],
  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      vue$: path.resolve(__dirname, 'node_modules', 'vue', 'dist', 'vue.esm-bundler.js'),
    },
  },
};
