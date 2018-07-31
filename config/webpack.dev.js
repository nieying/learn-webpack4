const path = require("path");
const jsPlugin = require("uglifyjs-webpack-plugin"); // js压缩插件
const htmlPlugin = require("html-webpack-plugin"); // html压缩插件
const extractTextPlugin = require("extract-text-webpack-plugin") // css分离

var website = {
  publicPath: "http://localhost:8808/"
}
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
    filename: "[name].js",
    publicPath: website.publicPath //publicPath：主要作用就是处理静态文件路径的。
  },
  // css, 图片，压缩
  module: {
    rules: [
      // css loader
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {loader: "css-loader"},
          ]
        })
        // [
        //   {loader: "style-loader"},
        //   {loader: "css-loader"}
        // ]
      },
      // less
      {
        test: /\.less$/,
        use: extractTextPlugin.extract({
          use: [
            {loader: "css-loader"},
            {loader: "less-loader"}
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      // sass 
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          use: [
            {loader: "css-loader"},
            {loader: "sass-loader"}
          ],
          fallback: "style-loader"
        })
      },
      // img
      {
        test: /\.(png|jepg|jpg|gif)/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 500, //是把小于500B的文件打成Base64的格式，写入JS
            outputPath: 'images/', //打包后的图片放到images文件夹下
          }
        }]
      },
      // html
      {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
      },
      // babel
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader',
          // option: {
          //   presets: ['es2015', 'react']
          // }
        },
        exclude: /node_modules/
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
    new extractTextPlugin("css/index.css"),
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