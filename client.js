var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8080');

var os = require('os');

ws.on('error', function error(e){
    switch(){
        
    }
    console.log(e);
});

ws.on('open', function open(){
    console.log("Connection open");
    ws.send("ready");
});

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
    }, 5000);
});

ws.on('close', function close(code, msg){
    console.log('connection closed with code:' + code);
});


