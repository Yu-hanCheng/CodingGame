
function websocket_client(type) {
  "use strict";
  window.WebSocket = window.WebSocket || window.MozWebSocket;
 
  var connection = new WebSocket('ws://192.168.1.107:1337');
  connection.onopen = function () {
    if (type==0) {
      var x_value = document.getElementById("input").value;
      var obj = { Name:'set',br_msg:x_value}
    }else if (type==1) {
      var input_code = document.getElementById("input_code").value;
      console.log("Now recv: " + Date.now());
      var obj = { Name:'code',msg:input_code}
    }
    var json = JSON.stringify(obj);
    console.log(json);
    connection.send(json);
  };

  connection.onerror = function (error) {
    content.html($('<p>', {
      text: 'Sorry, but there\'s some problem with your '
         + 'connection or the server is down.'
    }));
  };
      
  connection.onmessage = function (message) {

    try {
      console.log('msg: ', message.data);//set done
    } catch (e) {
      // console.log('Invalid JSON: ', message);
      return;
    }
  }
}