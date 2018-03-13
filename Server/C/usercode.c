#include <stdio.h>
#include <unistd.h>
#include <sys/time.h>
#include "IPCServer.h"
extern int ultra_val[3];
char  motor_pin[4];

void delay(int tt){

	char tmpbuf[4];
	sprintf(tmpbuf,"%d",tt);
	strcat(motor_pin,",");
	strcat(motor_pin,tmpbuf);

	char *p;
	p = strtok(motor_pin, ",");	
	*motor_pin=*p;
	IPCServer(motor_pin);
	strncpy(motor_pin, "", 3);

	long pause;
	clock_t now,then;
	pause = tt*(CLOCKS_PER_SEC/1000);
	now = then = clock();
	while( (now-then) < pause )
		now = clock();

}
void usercode(void)
{
	int cnt;
	while(1){
		cnt+=1;
		delay(1);
		printf("--usercode--%d\n",cnt);
		
		if (ultra_val[1]<10) {     
			motor_pin[0]='1';     
			motor_pin[1]='1';
			motor_pin[2]='1';     
			motor_pin[3]='0';

		}else if (ultra_val[1]>20)
		{
			
			motor_pin[0]='1';
			motor_pin[1]='0';
			motor_pin[2]='0';
			motor_pin[3]='0';
			delay(600);
			
		}
	}
	
}
