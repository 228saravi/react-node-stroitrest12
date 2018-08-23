var path = require('path')
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
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
                test: /\.scss$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  {
                    loader: 'postcss-loader',
                    options: {
                      plugins: () => [
                        require('autoprefixer')
                      ],
                    }
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      includePaths: [ path.join('./src/styles/partials') ]
                    }
                  }
                ]
              },
              {
                test: /\.woff2?$/,
                use: {
                  loader: 'file-loader',
                  options: {
                    prefix: 'font/'
                  }
                }
              },
              {
                test: /\.(jpg|png|svg)$/,
                use: 'file-loader'
              }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[chunkhash].css'
          }),
    ]
}