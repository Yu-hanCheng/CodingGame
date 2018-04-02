// // (function((io){
// // 	var socket = io.connect();
// // 	if (typeof console !=='undefined') {
// // 		log('Connectiong to Sails.js...');
// // 	}
// // 	socket.on('connect',function socketConnect(){
// // 		console.log("This is from the connect: ", this.socket.sessionid);
// // 	})
// // }
// // });

// // ===========================================================================

// //sends this socket id so it can be subscribed at the controller
// io.socket.get('/user/watchUser', function(resData, jwres) {
//     console.log(resData);
// });

// //adds listener and what to do once receives event notification
// // io.socket.on('user',function(obj){
// //     //if(obj.verb ==='created'){
// //     console.log('chat event is '+ JSON.stringify(obj));
// //     $("#user-list").append('<li>' + obj.data.name + '</li>');
// // });

$("#Signin_navy").click( function() {
	console.log("Signin click\n");
    io.socket.post('/user/createpub/',{user_email:$("#email_navy").val(),user_online:true});
    $("#onlinetag").val("");
});