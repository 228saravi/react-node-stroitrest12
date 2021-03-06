const path =require('path')
const webpack = require('webpack')
const HTMLwebpackplugin = require('html-webpack-plugin') 
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimazCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')
//const MinifyPlugin = require('babel-minify-webpack-plugin')
module.exports = {
    entry:{
        main: ['babel-polyfill',
        './src/index.js']
    },
    mode:'production',
    output:{
        filename:'[name]-bundle.js',
        path: path.resolve(__dirname,'../dist'),
        publicPath: '/'
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            parallel: 4
          })]
      },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader'
                    }
                ],
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader: MiniCSSExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader:'postcss-loader'
                    }
                ]
            },            
            {
                test:/\.scss$/,
                use:[
                    {
                        loader: MiniCSSExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use:[
                    {
                        loader: 'html-loader',
                        // options:{
                        //     attr:['img:src']
                        // }
                    }
                ]
            },
            {
                test: /\.(jpg|gif|png)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'images/[name]-[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test:/\.pug$/,
                use:[
                    {
                        loader:'pug-loader'
                    }
                ]
            }
        ]
    },
    plugins:[
        new OptimazCSSAssetsPlugin(),
        new CompressionPlugin({
            compressionOptions: {
               numiterations: 15
            },
            algorithm(input, compressionOptions, callback) {
              return zopfli.gzip(input, compressionOptions, callback);
            }
        }),
        new MiniCSSExtractPlugin({
            "filename": "[name]-[contenthash].css"
        }),
        new HTMLwebpackplugin({
            template : "./index.html",

            title: "dsfsdfsdf"
        }),
    ]
}