const path = require('path');
const merge = require('webpack-merge');
const blocksCSSPlugin = require('mini-css-extract-plugin');
const editBlocksCSSPlugin = require('mini-css-extract-plugin');
const common = require('./webpackGutenberg.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@wordpress/default',
              ['@babel/preset-env', {
                targets: {
                  // The % refers to the global coverage of users from browserslist
                  browsers: ['>2%', 'not ie 11', 'not op_mini all'],
                },
              }],
            ],
            plugins: [
              [
                '@babel/transform-react-jsx',
                { pragma: 'wp.element.createElement' },
              ],
            ],
          },
        },
      },
      {
        test: /style\.s?css$/,
        use: [
          blocksCSSPlugin.loader, // 3. Extract css into files
          {
            loader: 'css-loader', // 2. Turns css into commonjs
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader', // 1. Turns sass into css
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /editor\.s?css$/,
        use: [
          editBlocksCSSPlugin.loader, // 3. Extract css into files
          {
            loader: 'css-loader', // 2. Turns css into commonjs
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader', // 1. Turns sass into css
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
});
