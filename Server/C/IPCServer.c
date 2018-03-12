#include "IPCServer.h"
#include <string.h>
#define QLEN 10
extern int ultra_val[3];
int motor_c[4];
int IPCServer(void)
{
	int    fd, clifd, size, len, err, rval, rc, come_in;
	struct sockaddr_un un,from;
	int ret;
	char buff[8192];
	socklen_t fromlen = sizeof(from);
	memset(&un, 0, sizeof(un));
	un.sun_family = AF_UNIX;
	strcpy(un.sun_path, "/tmp/server_child.sock");
	if ((fd = socket(AF_UNIX, SOCK_STREAM, 0)) < 0) {
		perror("socket error");
		exit(1);
	}
	size = offsetof(struct sockaddr_un, sun_path) + strlen(un.sun_path);
	printf("%d\n",size);
	unlink(un.sun_path);

	if (bind(fd, (struct sockaddr *)&un, size) < 0) {
		perror("bind error");
		exit(1);
	}else if (listen(fd, QLEN) < 0) { /* tell kernel we're a server */
		printf("listen<0\n");
		rval = -3;
		goto errout;
	}
	printf("UNIX domain socket bound\n");
	
	while(1){
		len = sizeof(un);
		if ((clifd = accept(fd, (struct sockaddr *)&un, &len)) < 0){
			printf("accept<0\n");
			return(-1);     /* often errno=EINTR, if signal caught */
		}else{
			come_in=1;
			printf("UNIX domain socket accepted\n");
			if((rc=read(clifd,buff,sizeof(buff))) > 0) {
	      		printf("read %u bytes: %.*s\n", rc,rc, buff);
	      		char *delim = ",";
				char * pch;
				pch = strtok(buff,delim);
				pch = strtok(NULL,"}");
				sscanf(pch,"\"msg\":[%d,%d,%d]}",ultra_val,ultra_val+1,ultra_val+2);
				printf("ultra_value=[%d,%d,%d]\n",ultra_val[0],ultra_val[1],ultra_val[2]);
				int *p_motor_callback;
				char *send_motor_callback;
				send_motor_callback= usercode();
				for (int i = 0; i < 10; ++i)
				{
					printf( "motor_pin[%d]=%d\n", i, *(send_motor_callback + i));
				}
	      		if (send(clifd, send_motor_callback,21, 0) == -1) {
					perror("sendback error");
					close(clifd);
				}
	    	}else if (rc == 0) {
		      printf("EOF\n");
		      goto errout;
    		}
		}
		if (rc == -1) {
	      perror("read error");
	      exit(-1);
		}
	}
errout:
	close(clifd);
	printf("errout\n");
	return(rval);	
}