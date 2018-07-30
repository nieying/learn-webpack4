const path = require("path");
module.exports = {
  mode: "development",
  // 入口文件
  entry: {
    main: path.resolve(__dirname, "../src/main.js"),
    main2: path.resolve(__dirname, "../src/main2.js")
  },

  // 出口文件
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  // css, 图片，压缩
  module: {},
  // 用于生产模块和各项功能；
  plugins: [],
  // webpack开发服务项
  devServer: {}
};
