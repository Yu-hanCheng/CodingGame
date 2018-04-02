/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var bcrypt= require('bcrypt');
module.exports = {
	// //Ep13
	'new': function(req,res){
	// 	var oldDateObj = new Date();
	// 	var newDateObj = new Date(oldDateObj.getTime()+60000);
	// 	req.session.cookie.expires = newDateObjl 
	// 	req.session.authenticated = true;
	// 	console.log(req.session);
		res.view('session/new');
	},
	create: function(req,res,next){
		if(!req.param('email')|| !req.param('password')){
			var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message:'You must enter both a username and password'}];
			req.session.flash ={
				err: usernamePasswordRequiredError
			}
			res.redirect('/session/new');
			return;
		
		}
		User.findOneByEmail(req.param('email'),function foundUser(err,user){
			if (err) {next(err);}
			if (!user) {
				var noAccountError = [{name:'noAccount',message:'The email address'+req.param('email')+'not found.'}]
				req.session.flash = {
					err:noAccountError
				}
				res.redirect('/session/new');
				return;
			}
			// var userstr =JSON.stringify(user);
			// console.log("sessionController.js-user: "+userstr);
			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid){
				if (err) {return next(err);}
				if (!valid) {
					var usernamePasswordMismatchError = [{name:'usernamePasswordMismatch', message:'Invalid username and Password combination.'}]
;					req.session.flash ={
						err:usernamePasswordMismatchError
					}
					res.redirect('/session/new');
					return;
					}
					
					req.session.authenticated = true;
					req.session.User = user;
					user.online = true;
					User.publishCreate({id: user.id, online: user.online});
			        user.save(function(err){
			        	if (err) {return next(err);}
			        	User.publishUpdate(user.id,{
			        		online:user.online,
			        		id:user.id
			        	});
			        	// This is used in conjunction with config/policies.js file
						if (req.session.User.admin) {
							res.redirect('/user');
							return;
						}
						res.redirect('/user/show/'+ user.id);
					});
				});
			});
		},
		destroy: function(req, res, next){
			User.findOne(req.session.User.id, function foundUser (err, user){
				var userId = req.session.User.id;
				console.log(req.session.User.id+"== req.session.User.id");
				
				// 	The user is "logging out"
				User.update(userId,{
					online:false
				}, function (err){
					if (err) {next(err);}
					req.session.destroy();

					// Redirect the browser to the sign-in screen
					res.redirect('/session/new');
				});
			});
			
		}	
};

