#define MAX_MSG_LEN 16
#define MAX_BUF_LEN 32
#define SERVER_SOCK_FILE "/tmp/server_child.sock"
#define CLIENT_SOCK_FILE "/tmp/client.sock" //client.sock"

struct ipc_msg{
	unsigned int type;
	int len;
	char data[32];
	struct test_send_struct *sd_msg;
};
struct test_send_struct{
	char msg[MAX_MSG_LEN];
};
