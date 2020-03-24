/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.config').config;
const rootDir = require('./webpack.base.config').rootDir;

module.exports = {
  ...baseConfig,
  entry: {
    main: path.join(rootDir, 'src', 'index.tsx')
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.join(rootDir, 'dist', 'web')
  },
  plugins: [
    ...baseConfig.plugins,
    new HtmlWebpackPlugin({
      title: 'COVID-19',
      template: 'templates/index.html.ejs',
      filename: 'index.html'
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      maxSize: 50000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          reuseExistingChunk: true
        }
      }
    }
  }
};
