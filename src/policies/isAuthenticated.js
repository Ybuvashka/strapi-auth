module.exports = async (ctx, next) => {
  if (ctx.state.user) {
    return await next();
  }
  // ctx.forbidden(401, 'You must be logged in to access this.');
};