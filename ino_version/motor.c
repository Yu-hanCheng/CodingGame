#include "motor.h"
#include <stdint.h>
char  motor_pin[4]={'0','0','0','0'};
char*  motor_time[6];
enum statII{LOW, HIGH};
extern uint8_t motorPins[4];
void delay(int tt){
	printf("delay:%d\n",tt);
	sprintf(motor_time,"%d",tt);
	// strcpy(motor_time,"552");
	// memcpy(motor_time,tt,sizeof(tt)); error
	strcat(motor_pin,",");
		strcat(motor_pin,motor_time);
		printf("motor_pin: %s\n",motor_pin);
	char *p;
   		p = strtok(motor_pin, ",");	
		*motor_pin=*p;
	printf("motor_pin before delay: %s\n",motor_time );
	 long pause;
    clock_t now,then;

    pause = tt*(CLOCKS_PER_SEC/1000);
    now = then = clock();
    while( (now-then) < pause )
        now = clock();
	printf("motor_pin after delay: %s\n",motor_time );

}
void pinMode(int pin,int mode){
	printf("in motor.c pinMode setting");
}
void digitalWrite(int dpin, int dstat){ //digitalWrite(motorPins[L_F], HIGH);

    // strncpy(motor_pin, "", 3);
	// printf("in m_motor.c digitalWrite");
	if (dstat==HIGH)
	{
		printf("HIGH in m_motor.c digitalWrite\n");
		for (int i = 0; i < 4; ++i)
		{
			if (dpin==motorPins[i])
			{
				motor_pin[i]='1';
			}
		}
	}else{
		printf("LOW in m_motor.c digitalWrite\n");
		for (int i = 0; i < 4; ++i)
		{
			if (dpin==motorPins[i])
			{
				motor_pin[i]='0';
			}
		}
	}
}
void analogWrite(int apin, int astat){ //digitalWrite(motorPins[L_F], HIGH);

    strncpy(motor_pin, "", 3);
	printf("in m_motor.c analogWrite");

	for (int i = 0; i < 4; ++i)
	{
		if (apin==motorPins[i])
		{
			motor_pin[i]=astat;
		}
	}
}