var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('Connection open');
    ws.on('message', function incoming(message) {
        switch(message){
            case 'ready':
                console.log('client: ' + message);
                break;
            default:
                console.log('received: ' + message);
                break;
        }     
        console.log('received: %s', message);
    });
    ws.on('close', function close(code, msg){
        console.log('conneciton closed with code' + code);
    });
    ws.send('ready');
});

process.on('SIGINT', function(){
    wss.close();
});

