// websocket_client
// var req_url = "file:///Users/sarahcheng/Documents/Master/GRA/Simulator/require.js";
// // document.body.appendChild(document.createElement("script")).src = url;
// function loadjscssfile(filename){
//   var fileref=document.createElement('script')
//   fileref.setAttribute("type","text/javascript")
//   fileref.setAttribute("src", filename)
// }
// loadjscssfile(req_url);
// loadScript("file:///Users/sarahcheng/Documents/Master/GRA/Simulator/require.js");
// import {require} from 'require.js';//('require.js');
// var fs = require('fs');
function websocket_client(type) {
  "use strict";
  window.WebSocket = window.WebSocket || window.MozWebSocket;
 
  var connection = new WebSocket('ws://192.168.1.179:1337');
  // var connection = new WebSocket('ws://192.168.0.100:1337');
  // var connection = new WebSocket('ws://192.168.43.180:1337');
  // var connection = new WebSocket('ws://192.168.208.101:1337');
  connection.onopen = function () {
    if (type==0) {
      var x_value = document.getElementById("input").value;
      var obj = { Name:'set',br_msg:x_value}
    }else if (type==1) {
      var input_code = document.getElementById("input_code").value;
      console.log("Now recv: " + Date.now());
      var obj = { Name:'code',msg:input_code}
      // console.log(obj.br_msg);
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
      // var json = JSON.parse(message.data);
      console.log('msg: ', message.data);//set done
    } catch (e) {
      // console.log('Invalid JSON: ', message);
      return;
    }
  }
}
// websocket_client();