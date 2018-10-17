const Jobs = require('../../models/jobs.js')
const passport = require('koa-passport');
exports.get = async function(ctx, next) {
	await Jobs.find().then(result => ctx.body=result,
		reject=>{
            ctx.status = 400
            ctx.body = {error: reject
        }})
};
exports.post= async function (ctx,next) {
    await passport.authenticate('jwt', {session: false})(ctx, next);

    if (!ctx.state.user) {
      ctx.status = 400;
      ctx.body = {error: 'invalid credentials'};
      return;
    }
  
    // ctx.body = {
    //   private: 'top most secret info',
    //   email: ctx.state.user.email
    // };
    await Jobs.create(ctx.request.body).then((resolve)=>{
        ctx.body = {jobs: resolve};
    }).catch((e)=>{
        ctx.status = 400;
        ctx.body = {error: e};
  
    })
}