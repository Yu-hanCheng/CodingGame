//sends this socket id so it can be subscribed at the controller
io.socket.get('/user/new', function(resData, jwres) {
    console.log("resData");
    console.log(resData);
});

//adds listener and what to do once receives event notification
io.socket.on('user',function(obj){
    //if(obj.verb ==='created'){
    console.log('chat event is '+ JSON.stringify(obj));
    $("#user-list").append('<li>' + 123 + '</li>');
});

$("#Signin_navy").click( function() {
    io.socket.post('/user/createpub/',{name:"namenamename"});
    // $("#name").val("");
});