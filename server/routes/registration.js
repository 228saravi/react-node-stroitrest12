const passport = require('koa-passport');
const User = require('../models/user');
const pick = require('lodash/pick');
const config = require('config');
const jwt = require('jwt-simple');

exports.get = async function(ctx, next) {
	ctx.body = ctx.render('registration');
};

exports.post = async function(ctx, next) {
	const user = await User.create(ctx.request.body);
	// ctx.flash('error', 'message');
	// ctx.redirect('/registration');	
	await passport.authenticate('local', { session: false })(ctx, next);
	if (ctx.state.user) {
		const payload = {
		  id: ctx.state.user._id,
		  displayName: ctx.state.user.displayName
		};
	
		const token = jwt.encode(payload, config.jwtSecret);
	
		ctx.body = {token};
	  } else {
		ctx.status = 400;
		ctx.body = {error: "Invalid credentials"};
	  }
};
