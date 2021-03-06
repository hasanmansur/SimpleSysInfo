var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8080 });

//'connection' listener
wss.on('connection', function connection(ws) {
    console.log('Connection open');
	//'message' listener
    ws.on('message', function message(message) {
        console.log("-----------------------------------------------");
	    console.log(message);
		wss.broadcast(message);
	    console.log("-----------------------------------------------");
        });
	//'close' listener
    ws.on('close', function close(code, msg) {
        console.log('conneciton closed with code' + code);
    });
	//'error' listener
	ws.on('error', function error(e) {
		console.log(e);
	});
});

wss.broadcast = function (data) {
	wss.clients.forEach(function (client) {
		client.send(data);
	});
}
