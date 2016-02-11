var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8080 });

var browserClients = new Object();

wss.on('connection', function connection(ws) {
    console.log('Connection open');
    if(ws.upgradeReq.url.substr(1)){
        var key = ws.upgradeReq.url.substr(1);
        browserClients[key] = ws;
    }
    ws.on('message', function message(message) {
        switch(message){
            case 'ready':
                console.log('client: ' + message);
                //broadcast to browser clients
                for (var client in browserClients) {
                    browserClients[client].send('client: ' + message);
                }
                break;
            case 'browser ready':
                console.log(message);
                break;
            default:
                console.log('received: ' + message);
                //broadcast to browser clients
                for (var client in browserClients) {
                    browserClients[client].send('received: ' + message);
                }
                break;
        }     
    });
	//'close' listener
    ws.on('close', function close(code, msg){
        console.log('conneciton closed with code' + code);
    });
    ws.send('ready');
});

//'SIGINT' listener
process.on('SIGINT', function(){
    wss.close();
});

