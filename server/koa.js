const Koa = require('koa')
const path = require('path')
const KoaRouter = require('koa-router')
const fs = require('fs') 
//import path from 'path'

const server = new Koa()
const router = new KoaRouter()
const mongoose = require('./libs/mongoose');

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


const handlers = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

handlers.forEach(handler => require('./middlewares/' + handler).init(server));


router.post('/reg', require('./routes/registration').post)
router.post('/authorization', require('./routes/login').post)
router.get('/font', require('./routes/frontpage').get)
router.get('/priv', require('./routes/private').get)
router.get('/*', require('./routes/mainRoute').get)
server.use(router.routes());
server.listen('8080', ()=>{
    console.log('server is listen')
})