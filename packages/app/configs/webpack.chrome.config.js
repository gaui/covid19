/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webConfig = require('./webpack.web.config');
const rootDir = require('./webpack.base.config').rootDir;

webConfig.output.path = path.join(rootDir, 'dist', 'chrome');

module.exports = {
  ...webConfig,
  plugins: [
    ...webConfig.plugins,
    new HtmlWebpackPlugin({
      title: 'COVID-19',
      template: 'templates/manifest.json.ejs',
      filename: 'manifest.json',
      inject: false,
      minify: false
    })
  ]
};
