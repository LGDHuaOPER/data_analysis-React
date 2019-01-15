const webpack = require('webpack'); //引入webpack
const opn = require('opn'); //打开浏览器
const merge = require('webpack-merge'); //webpack配置文件合并
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf'); //基础配置
const webpackFile = require('./webpack.file.conf'); //一些路径配置
const eslintFormatter = require('react-dev-utils/eslintFormatter');

let config = merge(baseWebpackConfig, {
  /*设置开发环境*/
  mode: 'development',
  output: {
    path: path.resolve(webpackFile.devDirectory),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: ''
  },
  /*多出来 三个文件分别是：
    manifest.js（包清单）
    vendor.js(第三方包，明显体积很大，这是开发环境，生产环境会再压缩)
    common.js（公共组件）*/
  optimization: {
    //包清单
    runtimeChunk: {
      name: 'manifest'
    },
    //拆分公共包
    splitChunks: {
      cacheGroups: {
        //项目公共组件
        common: {
          chunks: 'initial',
          name: 'common',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        //第三方组件
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    /*设置热更新*/
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['cache-loader', 'babel-loader'],
        include: [path.resolve(__dirname, '../../app'), path.resolve(__dirname, '../../entryBuild')],
        exclude: [path.resolve(__dirname, '../../node_modules')]
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
              // @remove-on-eject-begin
              baseConfig: {
                extends: [require.resolve('eslint-config-react-app')]
              },
              //ignore: false,
              useEslintrc: false
              // @remove-on-eject-end
            },
            loader: require.resolve('eslint-loader')
          }
        ],
        include: [path.resolve(__dirname, '../../app')],
        exclude: [path.resolve(__dirname, '../../node_modules')]
      },
      {
        // test: /\.pcss$/,
        test: /\.(css|pcss)$/,
        // 参数importLoaders=1是为了预防css文件里面再import其他css文件，会使得import进来的不会自动加前缀
        // loader: 'style-loader?sourceMap!css-loader?importLoaders=1&sourceMap!postcss-loader?sourceMap',
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js' // 这个得在项目根目录创建此文件
              }
            }
          }
        ],
        // exclude: /node_modules/
      },
      {
        test: /\.less$/,
        //include: paths.appSrc,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              sourceMap: true,
              modifyVars: {
                'primary-color': '#1890ff',
                'link-color': '#1890ff',
                'success-color': '#52c41a',
                'warning-color': '#faad14',
                'error-color': '#f5222d',
                'font-size-base': '14px',
                'heading-color': 'rgba(0, 0, 0, .85)',
                'text-color': 'rgba(0, 0, 0, .65)',
                // 次文本色
                'text-color-secondary': 'rgba(0, 0, 0, .45)',
                'disabled-color': 'rgba(0, 0, 0, .45)',
                'border-radius-base': '3px',
                'border-color-base': '#d9d9d9',
                'box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)'
              },
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg|swf)$/,
        loader: 'file-loader?name=[name].[ext]&outputPath=' + webpackFile.resource + '/'
      }
    ]
  },
  /*设置api转发*/
  devServer: {
    host: '0.0.0.0',
    port: 8082,
    hot: true,
    inline: true,
    contentBase: path.resolve(webpackFile.devDirectory),
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: [
      {
        context: ['/tomcat/**', '/api/**'],
        target: 'http://localhost:8080/',
        secure: false,
        pathRewrite: { '^/api': '' }
      }
    ],
    /*打开浏览器 并打开本项目网址*/
    after() {
      opn('http://localhost:' + this.port);
    }
  }
});
module.exports = config;
