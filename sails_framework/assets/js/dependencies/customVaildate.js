//  $("#Signin_navy").click( function() {
//  console.log("Signin click\n");
//     io.socket.post('/user/createpub/',{user_email:$("#email_navy").val(),user_online:true});
// //     $("#name").val("");
// });
$(document).ready(function () {

  $('.form-signin').validate({
    rules: {
      name:{
        required: true
      },
      email: {
        type: 'email',
        required: true
      },
      password: {
        minlength:6,
        required: true
      },
      confirmation: {
        minlength:6,
        equalTo: "#password"
      }
    },
    success: function(element){
      element.text('OK!').addClass('valid');
    }
  });


});