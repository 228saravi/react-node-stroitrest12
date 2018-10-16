const path =require('path')
const webpack = require('webpack')
const HTMLwebpackplugin = require('html-webpack-plugin') 
// const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
    entry:{
        main: ['babel-polyfill', 'webpack-hot-middleware/client?reload=true',
        './src/index.js']
    },
    mode:'development',
    output:{
        filename:'[name]-bundle.js',
        path: path.resolve(__dirname,'../dist'),
        publicPath: '/'
    },
    devtool:"source-map",
    devServer:{
        contentBase: 'dist',
        overlay:true,
        hot:true,
        stats:{
            colors:true
        }
    },
    // optimization: {
    //     splitChunks: {
    //       // include all types of chunks
    //       chunks: 'all'
    //     }
    //   },
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
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
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
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
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
        new webpack.HotModuleReplacementPlugin(),
        new HTMLwebpackplugin({
            template : "./index.html",

            title: "dsfsdfsdf"
        }),
        new webpack.DefinePlugin({
            "process.env":{
                "NODE_ENV":JSON.stringify("development")
            }
        }),
        // new BundleAnalyzer({
        //     generateStatsFile: true
        // })
    ]
}