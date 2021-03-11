const path = require('path');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const blocksCSSPlugin = require('mini-css-extract-plugin');
const editBlocksCSSPlugin = require('mini-css-extract-plugin');
const common = require('./webpackGutenberg.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js',
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
              ['transform-react-remove-prop-types',
                {
                  mode: 'wrap',
                  ignoreFilenames: ['node_modules'],
                },
              ],
            ],
          },
        },
      },
      {
        test: /style\.s?css$/,
        use: [
          blocksCSSPlugin.loader, // 3. Extract css into files
          'css-loader', // 2. Turns css into commonjs
          'sass-loader', // 1. Turns sass into css
        ],
      },
      {
        test: /editor\.s?css$/,
        use: [
          editBlocksCSSPlugin.loader, // 3. Extract css into files
          'css-loader', // 2. Turns css into commonjs
          'sass-loader', // 1. Turns sass into css
        ],
      },
    ],
  },
});
