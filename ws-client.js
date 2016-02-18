var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8080');

//'error' listener
ws.on('error', function error(e){
	console.log(e);
});

//'open' listener
ws.on('open', function open(){
    console.log("Connection open");
});

//'message' listener
ws.on('message', function message(data, flags){
    
});

//'close' listener
ws.on('close', function close(code, msg){
    console.log('connection closed with code:' + code);
});


