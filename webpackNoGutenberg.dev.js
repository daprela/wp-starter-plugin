const path = require('path');
// eslint-disable-next-line import/no-unresolved
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

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
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: 'source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: true
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: false
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true
            }
          },
          {
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
          }
        ],
      },
    ],
  },
};
