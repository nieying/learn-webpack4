const path = require("path");
const jsPlugin = require("uglifyjs-webpack-plugin"); // js压缩插件
const htmlPlugin = require("html-webpack-plugin"); // html压缩插件
const extractTextPlugin = require("extract-text-webpack-plugin") // css分离

module.exports = {
  mode: "development",
  // 入口文件
  entry: {
    main: path.resolve(__dirname, "../src/main.js"),
    // main2: path.resolve(__dirname, "../src/main2.js")
  },

  // 出口文件
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  // css, 图片，压缩
  module: {
    rules: [
      // css loader
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
           fallback: "style-loader",
             use: "css-loader"
        })
        // [
        //   {loader: "style-loader"},
        //   {loader: "css-loader"}
        // ]
      },
      // img
      {
        test: /\.(png|jepg|jpg|gif)/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 500, //是把小于500B的文件打成Base64的格式，写入JS
              outputPath: 'images/', //打包后的图片放到images文件夹下
            } 
          }
        ]
      },
      {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
      }
    ]
  },
  // 用于生产模块和各项功能；
  plugins: [
    new jsPlugin(),
    new htmlPlugin({
      template: "./src/index.html",
      filename: 'index.html',
      minify: { //html文件压缩
        minimize: true,
        removeConments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true, // 去掉双引号
        hash: true, // 避免缓存
      }
    }),
     new extractTextPlugin("css/index.css")
  ],
  // webpack开发服务项
  devServer: {
    // 设置基本目录结构
    contentBase: path.resolve(__dirname, '../dist'),
    // 服务器ip地址，本地可以设置localhost
    host: 'localhost',
    // 服务端压缩是否开启
    compress: true,
    // 端口号
    port: 8808,
  }
};