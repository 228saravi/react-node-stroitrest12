var path = require('path')
// var autoprefixer = require('autoprefixer')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
// var extractPlugin = new ExtractTextPlugin({
// 	filename: './css/[name].css',
// });
module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    devServer: {
		historyApiFallback: true,
	},
    module: {
        rules: [
            {
                test: /\.js/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$|\.scss$/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: true } },
                    { loader: 'css-loader', options: { sourceMap: true } },
                  
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'                          
                        }
                    }, 'img-loader'
                ]
            }
            // {
            //     test: /\.scss$/,
            //     use:  [
            //         "style-loader", // creates style nodes from JS strings
            //         "css-loader", // translates CSS into CommonJS
            //         "postcss-loader"
            //         "sass-loader" // compiles Sass to CSS, using Node Sass by default
            //     ]
            // },
            // {
            //     test: /\.(gif|png|jpe?g|svg)$/i,
            //     use: [
            //       'file-loader',
            //       {
            //         loader: 'image-webpack-loader',
            //         options: {
            //           mozjpeg: {
            //             progressive: true,
            //             quality: 65
            //           },
            //           // optipng.enabled: false will disable optipng
            //           optipng: {
            //             enabled: false,
            //           },
            //           pngquant: {
            //             quality: '65-90',
            //             speed: 4
            //           },
            //           gifsicle: {
            //             interlaced: false,
            //           },
            //           // the webp option will enable WEBP
            //           webp: {
            //             quality: 75
            //           }
            //         }
            //       },
            //     ],
            //   }
        ]
    }
}