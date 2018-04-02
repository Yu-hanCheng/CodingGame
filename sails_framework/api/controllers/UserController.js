/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req, res){
        
        // res.locals.flash = _.clone(req.session.flash);
        // User.watch(req.socket);
        console.log('User new ');// + req.socket.id);
        res.view();

        // req.session.flash = {};
    },
    create: function (req, res, next) {
      
      var userObj ={
          name:req.param('name'),
          title:req.param('title'),
          email:req.param('email'),
          password:req.param('password'),
          confirmation:req.param('confirmation')
        }
      User.create(userObj, function userCreated(err,user){
          if(err){
            console.log(err);
            req.session.flash = {
              err: err
            }
            //if error redirect back to sign-up page
            console.log("user create err");
            return res.redirect('/user/new');
          }

          // res.json(user);
          // req.session.flash = {};
          req.session.authenticated = true;
          req.session.User=user;
          user.online = true;
          user.save(function(err){
            if (err) {return next(err);}
            res.redirect('/user/show/'+user.id);  
          })
      });
    },
    game: function(req, res){
      res.view();
    },
    show: function(req,res,next){
      console.log("user show");
      User.findOne(req.param('id'), function foundUser(err,user){
        if (err) return next(err);
        if (!user) {console.log("!user");return next();}
        res.view({
          user:user
        });
      });
    },
    index:function(req,res,next){
      
      // //Ep13
      // console.log(new Date());
      // console.log(req.session.authenticated);

      User.find(req.param('id'), function foundUsers(err,users){
        if (err) return next(err);
        
        res.view({

          users:users
        });
      });
    },
    edit: function(req,res,next){
      User.findOne(req.param('id'),function foundUser(err,user){
        if (err) return next(err);
        if (!user) return next('User doesn\'t exist.');
        res.view({
          user:user
        });
      });
    },
    update:function(req,res,next){
      console.log("user update");
      if (req.session.User.admin) {
        var userObj ={
          name:req.param('name'),
          title:req.param('title'),
          email:req.param('email'),
          admin:req.param('admin')
        }
      }else{
        var userObj ={
          name:req.param('name'),
          title:req.param('title'),
          email:req.param('email')
        }
      }

      User.update(req.param('id'),userObj, function userUpdate(err){
        if (err) {
          return res.redirect('user/edit/'+req.param('id'));
        }
        res.redirect('user/show/'+req.param('id'));
      })
    },
    // subscribe: function(req,res){
      
    //   User.find(function foundUsers(err,users){
    //     if (err) {return next(err);}
    //     // User.subscribe(req.socket);
    //     User.subscribe(req.socket, users);
    //     console.log('User subscribed to ' + req.socket.id);
    //     res.send(200);
    //   })
    // },
    createpub: function (req, res) {
        var data_from_client = req.params.all();
 console.log("data_from_client: "+data_from_client);
        if (req.isSocket && req.method === 'POST') {
            User.create(data_from_client)
                .then(function (data_from_client) {
                   
                    console.log("data_from_client json: "+JSON.stringify(data_from_client));
                    User.publishCreate({id: data_from_client.user_email, online: data_from_client.user_online});
                })
                .catch(function (err) {
                    console.log('Error creating new User. Error: ' + err);
                    return res.serverError('Server encountered a problem. Please contact administrator.');
                });
        }
    },
    destroy: function(req,res,next){
      User.findOne(req.param('id'),function foundUser(err,user){
        if (err) {return next(err);}
        if (!user) {return next('User doesn\'t exist.');}
        User.destroy(req.param('id'),function userDestroyed(err){
          if (err) {return next(err);}
        });
        res.redirect('/user');
      });
    }
};

