const passport = require('koa-passport');
const User = require('../models/user');
const pick = require('lodash/pick');

exports.get = async function(ctx, next) {
	ctx.body = ctx.render('registration');
};

exports.post = async function(ctx, next) {
	console.log((ctx.request.body));
	const user = await User.create(ctx.request.body);
	// ctx.flash('error', 'message');
	// ctx.redirect('/registration');
	await ctx.login(user);
};
