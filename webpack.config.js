var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');//引入生成html的插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');//引入抽离插件
var OpenBrowserPlugin = require('open-browser-webpack-plugin');//引入打开浏览器插件
module.exports = {
  //入口文件
  entry:'./src/entry.js',

  //出口文件
  output:{
    path:__dirname + "/build",
    //filename:"app-[hash].js"可使用hash值来命名
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './build',
    host: 'localhost',
    port: 9000,
    historyApiFallback: false,//使用h5的api进行返回操作
    proxy: {
      '/api': {
        // target: 'http://localhost:3000',
        target:'http://m.haozaishop.com/',
        pathRewrite: {'^/api': ''},
        changeOrigin:true
      }
    }
  },

  module: {
    loaders:[
      // {
      //   test:/\.css$/,
      //   loader:'style-loader!css-loader'//css2.0 loader不可省,先sassloader再cssloader再styleloader
      // }
      // ,

      // {
      //   test:/\.scss$/,
      //   loader:'style-loader!css-loader!sass-loader'
      // },

      {
        test:/\.css$/,
        loader:ExtractTextPlugin.extract({
          fallback:'style-loader',//将style-loader的文本内容抽离
          use:'css-loader'
        })
      },
      {
        test:/\.scss$/,
        loader:ExtractTextPlugin.extract({
          fallback:'style-loader',//将style-loader的文本抽离
          use:'css-loader!sass-loader'
        })
      },
      {
        test: /\.js$/,
        exclude:/node_modules/,
        loader: 'react-hot-loader!babel-loader'
      }
    ]
  },

  plugins:[
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   output: {
    //     comments: false //删除注释文字
    //   }
    // }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template:'./index.ejs',
      title:'好在'
    }),

    new ExtractTextPlugin({
      filename:'app.css',//同样可以加版本号
      disable:false,//打开抽离
      allChunks:true
    }),
    new OpenBrowserPlugin({
      url:'http://localhost:9000'
    })
  ],

  /* 检查到react或react-dom等模块时 不打包 但是入口处要引入才能检测到*/
  externals: {
    'react': 'window.React',//类jquery思想 window.$ = jquery
    'react-dom': 'window.ReactDOM',
    'react-router':'window.ReactRouter'//抽离ReactRouter
  }

}
