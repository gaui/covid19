/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  config: {
    devtool: 'source-map',
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward'
            }
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.svg$/,
          use: ['raw-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.svg']
    },
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /__snapshots__|.*(test|spec)\.[jt]sx?/
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        global: 'window'
      })
    ],
    node: {
      global: false,
      fs: 'empty'
    },
    devServer: {
      hot: true
    }
  }
};
