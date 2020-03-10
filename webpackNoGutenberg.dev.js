/* eslint-disable import/no-duplicates,new-cap */
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    './assets/js/admin.min': './src/js/admin.js',
    './assets/js/frontend.min': './src/js/frontend.js',
  },
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
    ],
  },
};
