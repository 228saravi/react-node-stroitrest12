const fs = require('mz/fs');

exports.init = app => app.use(async function(ctx, next) {

  console.log('--> add useful method to ctx');
  
  ctx.renderFile = async function (file) {
    ctx.body = await fs.readFile(file, 'utf-8');
  };

  await next();

});
