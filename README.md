# CodingGame
# require
* nodejs env
* npm?
* git clone `https://github.com/Yu-hanCheng/CodingGame.git`
# Usage
1. open terminal window in the project Path
    1. cd /CodingGame/Server/C
    2. `node U_server.js`
2. open another terminal window
    1. `gcc -g newcode.c usercode.c IPCServer.c -o ser2`
    > ignore the warnings
    3. `./ser2`
3. open another terminal window
    1. cd /CodingGame/sails_framework
    2. `npm install` to install node_modules
    3. `sails lift --port 2222`
4. open browser `localhost:2222`
    1. Sign up now >> Enter game
    2. copy the code in usercode.c and paste on the browser. Change the motorpin value
    * straight
    ```C=
    motor_pin[0]='1';
	motor_pin[1]='0';
	motor_pin[2]='1';
	motor_pin[3]='0';
    ```
    * turn right
    ```C=
    motor_pin[0]='1';
	motor_pin[1]='0';
	motor_pin[2]='0';
	motor_pin[3]='0';
    ```
