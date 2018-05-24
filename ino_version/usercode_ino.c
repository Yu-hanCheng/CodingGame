#include "motor.h"
#include <stdint.h>
extern int ultra_val[3];
extern char  motor_pin[4];
extern char*  motor_time[6];
enum MotorPinID {
    L_F = 0,
    L_B,
    R_F,
    R_B,
    NUM_OF_MOTOR_PIN
};
enum stat{LOW, HIGH};
// MotorPinID MPinID;
const uint8_t motorPins[NUM_OF_MOTOR_PIN] = {22, 23, 32, 33}; //L_F,L_B,R_F,R_B
char*  loop(void)
{
	
	if (ultra_val[1]<10)
	{
		digitalWrite(motorPins[L_F], HIGH);
		digitalWrite(motorPins[L_B], HIGH);
		digitalWrite(motorPins[R_F], HIGH);
		digitalWrite(motorPins[R_B], HIGH);
		delay(300);

	}else if (ultra_val[1]>20)
	{
		delay(111);
		digitalWrite(motorPins[L_F], HIGH);
		digitalWrite(motorPins[L_B], LOW);
		digitalWrite(motorPins[R_F], HIGH);
		digitalWrite(motorPins[R_B], LOW);
		delay(888);
	}
	delay(666);
	return motor_pin;

}