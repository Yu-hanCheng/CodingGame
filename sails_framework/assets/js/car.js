// alert('hihi');

// $(document).ready(function() {
// 	alert('it is ready!');
// 	var canvas = document.getElementById('myCanvas');
// 	console.log("ANOTHER JS FILE");
// 	console.log(canvas);
// 	console.log($);
// })
// car

var have_turn = 0;
var xpos = 230;
var ypos = 100;
var x_dir = 1;
var Isstop = 0;
var ctx = document.getElementById("myCanvas").getContext('2d');
var ang=0;
var turn_flag=0;

var ultra_value = {Name:'ultra_value',msg:[1000,100,100]}//f,l,r


window.WebSocket = window.WebSocket || window.MozWebSocket;

function init(ctx){
  console.log("in carrrr");
    drawObj(ctx);
  setInterval(updateCtx,500);
}

function updateCtx() {

  update();
  
}

function drawObj(ctx) {
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, 800, 10); 
      ctx.fillRect(0, 300, 400, 10); 
      ctx.fillRect(600, 300, 210, 10); 
      ctx.fillRect(400, 700, 200, 10);
      ctx.fillRect(400, 300, 10, 210);
      ctx.fillRect(800, 0, 10, 300);  
      ctx.fillRect(700, 100, 100, 40);    
    ctx.fillStyle = "orange";

}
function turn(_dir,_ang,ctx) {

  ctx.clearRect(xpos-50, ypos-20, 120, 90);
  ctx.translate(xpos+50,ypos+20);
  if(_dir=="R_F"){
    console.log("RF");
  for (var i =0; _ang > i;i+=1) {
    
    setInterval(ctx.rotate(1),100);
    }
    // ctx.rotate(1);
  }else if (_dir=="R_B") {
    console.log("RB");
    for (var i =0; _ang > i;i+=1) {
    ctx.rotate(-1);
    // setInterval(ctx.rotate(-1),100);
    }
  }else if (_dir=="L_B") {
    console.log("LB");
    for (var i =0; _ang > i;i+=1) {
    ctx.rotate(1);
    }
  }else if (_dir=="L_F") {
    
    for (var i =0; _ang > i;i+=1) {
      console.log("LF");
    ctx.rotate(-1);
    }
  }else if (_dir=="stop") {
    Isstop=1;
  }else if (_dir=="Forward") {
    
    for (var i =0; _ang > i;i+=1) {
      console.log("Forward");
    // ctx.clearRect(xpos-50, ypos-10, 130, 80);
    //   if(x_dir == 1){xpos += 5;}
    //     else if(x_dir>0){xpos -= 5;}
    //   ctx.fillRect(xpos, ypos, 100, 40);
    //   var ttt=0;
    //   while(ttt<99999){
    //   ttt+=1;
    // }
    }
  }else if (_dir=="Backward") {
    console.log("Backward");
    for (var i =0; _ang > i;i+=1) {
    // ctx.clearRect(xpos-50, ypos-10, 130, 80);

    //   if(x_dir == 1){xpos += 5;}
    //     else if(x_dir>0){xpos -= 5;}
    //   ctx.fillRect(xpos, ypos, 100, 40);
    //   var ttt=0;
    //   while(ttt<99999){
    //   ttt+=1;
    // }
    }
  }

  
  // console.log("right: "+_ang);
  xpos=-50;
  ypos=-20;
  ctx.fillRect(xpos, ypos, 100, 40);

  ctx.fillStyle = "red";
  ctx.fillRect(xpos, ypos, 10, 40);
  ctx.fillStyle = "orange";
}
function Sense_distance(ctx) {
  ctx.clearRect(xpos-50, ypos-10, 130, 80);

      if(x_dir == 1){xpos += 5;}
        else if(x_dir>0){xpos -= 5;}
      ctx.fillRect(xpos, ypos, 100, 40);
  if(!Isstop){
      
      // console.log(xpos);
      // var i =10;

      for(var i=10;i>2;i-=2){ //an obstacle at least 10 pixel width
        var imgData = ctx.getImageData(xpos+100+(i*10), ypos-20, 1, 90);//front
        
        for(j=0;j<imgData.data.length;j+=4){ //just check the red value magic num 450?
          if(imgData.data[j]==255){
           // alert(i+" "+xpos+","+ypos+" "+j+" "+imgData.data);
            ultra_value.msg[0] =i;
            console.log("obstacle: "+i);
            // turn("L_B",40);
            break;
          }
        }
        // if(break_f_flag>0){
        //     break;
        //   }
      }
      // i =10;
      // for(i=9;i>2;i--){ 
      //   var imgData = ctx.getImageData(xpos+50, ypos-20-(i*10), 20, 1);//left
      //   for(j=0;j<imgData.data.length;j+=40){ 
      //     if(imgData.data[j]==255){
      //       ultra_value.msg[1] =i; =i;
      //       console.log("obstacle: "+i);
      //       break;
      //     }
      //   }
      //   imgData = ctx.getImageData(xpos+50, ypos-20-(i*10), 20, 1);
      // }
      // i =10;
      // for(i=9;i>2;i--){ 
      //   var imgData = ctx.getImageData(xpos+50, ypos+60+(i*10), 20, 1);//right
      //   for(j=0;j<imgData.data.length;j+=40){ 
      //     if(imgData.data[j]==255){
      //       ultra_value.msg[2] =i;
      //       console.log("obstacle: "+i);
      //       break;
      //     }
      //   }
      //   imgData =ctx.getImageData(xpos+50, ypos+60+(i*10), 20, 1);
      // }
  }
}
function update(){
  console.log("===========update==========");
  Sense_distance(ctx);
var connection = new WebSocket('ws://192.168.1.179:1337');
  // var connection = new WebSocket('ws://192.168.0.100:1337');
  // var connection = new WebSocket('ws://192.168.208.23:1337');
  connection.onopen = function () {

    var json = JSON.stringify(ultra_value);
    connection.send(json);
  };
  connection.onmessage = function (evt){
    var msgfromserver = evt.data;
    console.log("car recv:"+msgfromserver);
    var parse_msg =JSON.parse(msgfromserver)
   if (parse_msg.Name==='motor_dir') {
       console.log("dir: "+parse_msg.msg.direct+"\n angle :"+parse_msg.msg.angle);
      turn(parse_msg.msg.direct,parse_msg.msg.angle,ctx);
      }
  connection.close();
  }
}

init(ctx); 
