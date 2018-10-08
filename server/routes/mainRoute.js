const fs = require('mz/fs')
exports.get = async function (ctx, next) {
    await ctx.renderFile('./server/routes/index.html');     
}