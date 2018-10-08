
// Usually served by Nginx
const staticMiddleware = require('koa-static');
exports.init = app => app.use( staticMiddleware('dist'));

