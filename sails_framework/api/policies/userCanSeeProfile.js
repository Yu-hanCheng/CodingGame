module.exports=function(req,res,ok){
	console.log("usercanseeprofile.js req.param: "+ req+"\n");
	var sessionUserMatchesId = req.session.User.id===req.param('id');
	var isAdmin = req.session.User.admin;
	console.log("usercanseeprofile.js req.session.User.id: "+ req.session.User.id+"\n");
	console.log("usercanseeprofile.js req.param('id'): "+ req.param('id')+"\n");
	// console.log("usercanseeprofile.js isAdmin: "+ isAdmin+"\n");

	if(!(sessionUserMatchesId || isAdmin)){
		var noRightsError = [{name:'noRights',message:'You must be an admin'}];
		req.session.flash = {
			err:noRightsError
		}
		res.redirect('/session/new');
		console.log("usercanseeprofile ! session");
		return;
	}
	ok();
};