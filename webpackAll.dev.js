/* eslint-disable import/no-duplicates,new-cap */
const path = require('path');
const blocksCSSPlugin = require('mini-css-extract-plugin');
const editBlocksCSSPlugin = require('mini-css-extract-plugin');
const adminCSSPlugin = require('mini-css-extract-plugin');
const frontendCSSPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    './assets/js/editor.blocks.min': './blocks/editor.blocks.js',
    './assets/js/frontend.blocks.min': './blocks/frontend.blocks.js',
    './assets/js/admin.min': './src/js/admin.js',
    './assets/js/frontend.min': './src/js/frontend.js',
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js',
  },
  plugins: [
    new blocksCSSPlugin({ filename: './assets/css/blocks.style.min.css' }),
    new editBlocksCSSPlugin({ filename: './assets/css/blocks.editor.min.css' }),
    new adminCSSPlugin({ filename: './assets/css/admin-styles.min.css' }),
    new frontendCSSPlugin({ filename: './assets/css/frontend-styles.min.css' }),
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '.assets/images',
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@wordpress/default'],
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
      {
        test: /admin-styles\.s?css$/,
        use: [
          adminCSSPlugin.loader, // 3. Extract css into files
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
        test: /frontend-styles\.s?css$/,
        use: [
          frontendCSSPlugin.loader, // 3. Extract css into files
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
};
