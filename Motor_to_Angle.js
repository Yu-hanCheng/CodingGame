// Motor_to_Angle
//time:vot:angle,time:angle=720：360
var HIGH = 1;
var LOW = 0;
module.exports={
	Motor_to_Angle: function(motor_c,dtime) {
	
	  	console.log("in MOTA dtime "+ dtime);
	  if(motor_c[0]==HIGH){
	    if (motor_c[1]==HIGH) {
	      if (motor_c[2]==HIGH && motor_c[3]==LOW) {
	        motor.msg.direct="L_F";motor.msg.angle=45;
	      }else if(motor_c[2]==LOW && motor_c[3]==HIGH) {
	        motor.msg.direct="L_B";motor.msg.angle=45;
	      } else{ //motor_c[2]==LOW && motor_c[3]==HIGH
	        motor.msg.direct="stop";
	      }
	    }else{ //motor_c[1]==L
	      if (motor_c[2]==HIGH && motor_c[3]==LOW) {
	        motor.msg.direct="Forward";
	      }else if(motor_c[2]==LOW && motor_c[3]==HIGH) {
	        motor.msg.direct="R_F";motor.msg.angle=90;
	      } else{ //motor_c[2]==LOW && motor_c[3]==HIGH
	        motor.msg.direct="R_F";motor.msg.angle=45;
	      }
	    }
	  }else{ //motor_c[0]==LOW
	      if (motor_c[1]==HIGH) { //L_B
	        if (motor_c[2]==HIGH && motor_c[3]==LOW) {
	          motor.msg.direct="L_F";motor.msg.angle=90;
	        }else if(motor_c[2]==LOW && motor_c[3]==HIGH) {
	          motor.msg.direct="Backward";motor.msg.angle=0;
	        } else{ //motor_c[2]==LOW && motor_c[3]==HIGH
	          motor.msg.direct="R_B";motor.msg.angle=45;
	        }
	      }else{ //motor_c[1]==LOW
	        if (motor_c[2]==HIGH && motor_c[3]==LOW) { //RF
	          motor.msg.direct="L_F";motor.msg.angle=45;
	        }else if(motor_c[2]==LOW && motor_c[3]==HIGH) {
	          motor.msg.direct="L_F";motor.msg.angle=45;
	        } else{ //motor_c[2]==LOW && motor_c[3]==HIGH
	          motor.msg.direct="stop";motor.msg.angle=0;
	        }
	      }
	  }
	
	return motor;
}
}