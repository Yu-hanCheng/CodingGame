module.exports = function(req, res, next) {

  res.locals.flash = {};

  if(!req.session.flash) {console.log('!session in flash');return next();}

  res.locals.flash = _.clone(req.session.flash);

  
  // console.log(req.session.flash);

  // clear flash
  req.session.flash = {};
  next();
};