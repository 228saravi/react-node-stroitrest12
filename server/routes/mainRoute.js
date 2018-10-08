const fs = require('mz/fs')
exports.get = async function (ctx, next) {
    var _data;
    await ctx.renderFile('./server/routes/index.html');
    console.log(ctx.body);
     
}