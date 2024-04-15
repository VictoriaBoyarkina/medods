const { defineConfig } = require('@vue/cli-service');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/medods/',
  configureWebpack: {
    // Add MiniCssExtractPlugin to the list of plugins
    plugins: [
      new MiniCssExtractPlugin()
    ]
  }
});