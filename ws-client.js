var WebSocket = require('ws');
var ws;
var interval;

/**
* Connect() - connects ws clients to ws server
*/
var connect = function () { 
    console.log("ws client trying to connect to ws server ... ");  
    ws = new WebSocket('ws://localhost:8080');
    /**
    * WS events listener
    */
    ws.on('error', function error(e){
        console.log("error: ws client connecting ws server");
		connect();	
    });

    ws.on('open', function open(){
        console.log("ws client - ws server connection open");
    });

    ws.on('close', function close(code, msg){
        console.log("ws client - ws server connection closed with code:" + code);
		connect();
    });

	ws.on('message', function message(data, flags){
		console.log("-----------------------------------------------");
		console.log(data);
		console.log("-----------------------------------------------");
	});
}

connect();

