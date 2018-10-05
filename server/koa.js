const Koa = require('koa')
const path = require('path')
const KoaRouter = require('koa-router')
//import path from 'path'

const server = new Koa()
const router = new KoaRouter()

const webpack = require("webpack")
const config = require("../config/webpack.dev.js")
const compiler = webpack(config)

const webpackDevMiddleware = require("koa-webpack-dev-middleware")(
    compiler,
    config.devServer)

const webpackHotMiddleware=require('koa-webpack-hot-middleware')(compiler)

server.use(webpackDevMiddleware)
server.use(webpackHotMiddleware)
// const staticMiddleware = express.static('dist')

const staticMiddleware = require('koa-static');
server.use(staticMiddleware('dist'));

router.get('*', require('./routes/mainRoute').get)
server.use(router.routes());
server.listen('8080', ()=>{
    console.log('server is listen')
})