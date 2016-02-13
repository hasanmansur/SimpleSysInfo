var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8080 });

//redis client
var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('my server gets connected to redis server');
});


//redis client

var browserClients = new Object();

//'connection' listener
wss.on('connection', function connection(ws) {
    console.log('Connection open');
    if(ws.upgradeReq.url.substr(1)){
        var key = ws.upgradeReq.url.substr(1);
        browserClients[key] = ws;
		console.log(key);
		client.hmset(key, ws);
		client.hgetall(key, function(err, object) {
			console.log(object);
		});
    }
	//'message' listener
    ws.on('message', function message(message) {
        switch(message){
            case 'ready':
                console.log('client: ' + message);
                //broadcast to browser clients
                for (var client in browserClients) {
					try {
						browserClients[client].send('client: ' + message);
					}
                    catch (e) {
						console.log(e);
						delete browserClients[client]; 
					}
                }
                break;
            case 'browser ready':
                console.log(message);
                break;
            default:
                console.log('received: ' + message);
                //broadcast to browser clients
                for (var client in browserClients) {
					try {
						browserClients[client].send('received: ' + message);
					}
                    catch (e) {
						console.log(e);
						delete browserClients[client];
					}
                }
                break;
        }     
    });
	//'close' listener
    ws.on('close', function close(code, msg) {
        console.log('conneciton closed with code' + code);
    });
	//'error' listener
	ws.on('error', function error(e) {
		console.log(e);
	});
    ws.send('ready');
});

//'SIGINT' listener
process.on('SIGINT', function() {
    wss.close();
});
