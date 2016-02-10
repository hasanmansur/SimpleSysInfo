var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8080');

var os = require('os');

//'error' listener
ws.on('error', function error(e){
	switch(e.code){
		case 'ECONNREFUSED':
			console.log('connection refused. PLz check whether server is ON & socket address is correct');	
			break;
		default:
			break;
	}
	console.log(e);
});

//'open' listener
ws.on('open', function open(){
    console.log("Connection open");
    ws.send("ready");
});

//'message' listener
ws.on('message', function message(data, flags){
    console.log('server: %s', data);
    console.log('Starts sending data...');
    setInterval(function(){
        if(ws.readyState == ws.OPEN){
            ws.send(os.totalmem().toString());
        }
        else{
            console.log('Connection is not open. Press ctrl+c & restart client');
        }
    }, 1000);
});

//'close' listener
ws.on('close', function close(code, msg){
    console.log('connection closed with code:' + code);
});


