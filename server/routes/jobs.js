const Jobs = require('../models/jobs.js')
const passport = require('koa-passport');
exports.get = async function(ctx, next) {
	await Jobs.find().then(result => ctx.body=result,
		reject=>{
            ctx.status = 400
            ctx.body = {error: reject}
        })
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
        ctx.body = {jobs: resolve}
    }).catch((e)=>{
        ctx.status = 400
        ctx.body = {error: e}
  
    })
}
exports.put= async function (ctx,next) {
    await passport.authenticate('jwt', {session: false})(ctx, next)

    if (!ctx.state.user) {
      ctx.status = 400
      ctx.body = {error: 'invalid credentials'}
      return
    }
  
    // ctx.body = {
    //   private: 'top most secret info',
    //   email: ctx.state.user.email
    // };
    console.log(ctx.request.body)
    await Jobs.findByIdAndUpdate({_id:ctx.request.body._id},ctx.request.body)
        .then(resolve=>{
            if (resolve.nModified = 0) {
                ctx.status = 400;
                ctx.body = {error: reject}
                return;
            }
            ctx.body={job:ctx.request.body} 
        },
            reject=>{
                ctx.status = 400;
                ctx.body = {error: reject}
            })
}
exports.delete= async function (ctx,next) {
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
    console.log(ctx.request.body)
    await Jobs.findByIdAndDelete(ctx.request.body.id)
        .then(resolve=>{ctx.body={job:resolve}},
            reject=>{
                ctx.status = 400;
                ctx.body = {error: reject};
            })
}