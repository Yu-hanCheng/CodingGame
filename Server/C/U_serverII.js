process.title = 'U_serverII.js';
var net = require('net');
var fs = require('fs');
var path = '/tmp/server_child.sock';
var webSocketsServerPort = 1337;
var webSocketServer = require('websocket').server;
var http = require('http');
var clients=[0,0,0,0,0];
motor={Name:'motor_dir',msg:{direct:'right',angle:90}};
// main
function init(){
  setInterval(IPC,300);
  websocket();
}
//********** global var ************
//from_browser
var code
={Name:'code',msg:'txt'}
var ultra_value
={Name:'ultra_value',msg:[12,30,1]}//F,L,R
var des
={Name:'des',msg:[0,0]}//x,y


// *********** IPC with newcode ***************
function IPC(){
  const MTOA = require('./Motor_to_Angle');

  var u_client = new net.Socket();
  u_client.connect(path);
  var u_code_json = JSON.stringify(ultra_value);//"Name:ultra_value,msg:[1,1,1]
  u_client.write(u_code_json);

  u_client.on('data', (chunk) => { 
    var chunkres_pin = chunk.toString().split("\0");
    console.log("recved from IPCServer: "+chunkres_pin[0]); 
    motor=MTOA.Motor_to_Angle(chunkres_pin[0],chunkres_pin[1]);
    console.log(motor); 
  });

  u_client.on('error', function(err) {
    console.log("Error: " + err);
  });
    
  u_client.end();
  u_client.on('end', function(err) {
  });
}


// *********** websocket with browser ************

function websocket(){

  var server = http.createServer(function(request, response) {});
  server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port "+ webSocketsServerPort);
  });
  var wsServer = new webSocketServer({
    httpServer: server
  });
  wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin); 
    var index = clients.push(connection) - 1;
    var userName = false;
    var userColor = false;
    var fs = require('fs');
    connection.on('message', function(message) {

      if (message.type === 'utf8') { // accept only text
        var data = JSON.parse(message.utf8Data);
        if (data.Name === "ultra_value") {
            ultra_value.msg=data.msg;
            var msg_tocar = JSON.stringify(motor);
            clients[index].sendUTF(msg_tocar);
            console.log(msg_tocar); 
        }else if(data.Name === "des"){ // log and broadcast the message
            position[0]=data.msg;    
        }else if (data.Name === "code") {
            console.log("got code from browser");
            fs.writeFile("usercode.c", data.msg, function(err) {
              if(err) { return console.log("write file error"); }
            });
            const child = require('child_process').exec;
            var cmdString = 'pkill -f ser2; gcc -g newcode.c usercode.c IPCServer.c -o ser2; ./ser2 ;'; //pm2 start 
            child(cmdString, (err, stdout, stderr) => {
              console.log(stdout);
            });
            clients[index].sendUTF("Received and exec the code");
        }
      }//if (message.type === 'utf8')
    });
    connection.on('close', function(connection) {
      return ;
    });
  });
}
init();