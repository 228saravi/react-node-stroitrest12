const passport = require('koa-passport')

exports.get = async function(ctx, next) {
  
  await passport.authenticate('jwt', {session: false})(ctx, next);
  if (ctx.state.user) {
    ctx.body = 'ctx.render(welcome)';
  } else {
    ctx.body = 'ctx.render(login)';
  }

};

