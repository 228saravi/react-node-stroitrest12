const path =require('path')
const webpack = require('webpack')
const HTMLwebpackplugin = require('html-webpack-plugin') 
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimazCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//const MinifyPlugin = require('babel-minify-webpack-plugin')
module.exports = {
    entry:{
        main: './js/main.js'
    },
    mode:'production',
    output:{
        filename:'[name]-bundle.js',
        path: path.resolve(__dirname,'../dist'),
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
          // include all types of chunks
          chunks: 'all',
          minChunks: 2
        }
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
        new MiniCSSExtractPlugin({
            "filename": "[name]-[contenthash].css"
        }),
        new HTMLwebpackplugin({

            template : "./html/index.pug",

            title: "dsfsdfsdf"
        })
    ]
}