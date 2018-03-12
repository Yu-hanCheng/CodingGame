#include <stdio.h>
#include <unistd.h>
#include <sys/time.h>
extern int ultra_val[3];
char* usercode(void)
{
	static char  motor_pin[4];
	strncpy(motor_pin, "", 3);
	printf("in usercode");
	
	if (ultra_val[1]<10)
	{
		motor_pin[0]='1';
		motor_pin[1]='1';
		motor_pin[2]='1';
		motor_pin[3]='0';

	}else if (ultra_val[1]>20)
	{
		
		motor_pin[0]='0';
		motor_pin[1]='0';
		motor_pin[2]='1';
		motor_pin[3]='0';
		int time =550;
		char tmpbuf[4];
		sprintf(tmpbuf,"%d",time);
		strcat(motor_pin,",");
		strcat(motor_pin,tmpbuf);
		printf("motor_pin: %s\n",motor_pin);
	char *p;
   		p = strtok(motor_pin, ",");	
		*motor_pin=*p;

	}

	return motor_pin;
}