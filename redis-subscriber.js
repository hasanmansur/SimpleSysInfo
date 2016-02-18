/**
 * Redis Subscriber Client
 */
var redis = require("redis");
var subscriber = redis.createClient();

/**
* WS client
*/
var WebSocket = require('ws');
var ws;

/**
* Redis connection events listener
*/
subscriber.on("ready", function () {
	console.log("subscriber is ready");
});

subscriber.on("connect", function () {
	console.log("subscriber is connected to redis server");
});

subscriber.on("error", function (e) {
	console.log("error: subscriber connecting redis server");
});

subscriber.on("reconnecting", function (r) {
	console.log("trying to reconnect to redis server ..." + " Attempt#" + r.attempt + ", Delay: " + r.delay + "ms");
});

subscriber.on("end", function () {
	console.log("redis server connection has closed");
});

/**
* Redis subscribe events listener
*/
subscriber.on("subscribe", function (channel, count) {
	console.log("subscribes to channel: " + channel);
	console.log("total channel subscription: " + count);
});

subscriber.on("message", function (channel, message) {
	console.log("-----------------------------------------------");
	console.log(message);
	console.log("-----------------------------------------------");
	//send it to WS server
	try {
		ws.send(message);
	}
	catch (e) {
		console.log("failed to send data to ws server" + " - " + e);
		connect();
	}
});

/**
* Redis channel subscription
*/
subscriber.subscribe("test_channel");


/**
* Connect() - connects redis subscriber to ws server
*/
var connect = function () { 
    console.log("subscriber trying to connect to ws server ... ");  
    ws = new WebSocket('ws://localhost:8080');
    /**
    * WS events listener
    */
    ws.on('error', function error(e){
        console.log("error: subscriber connecting ws server");
    });

    ws.on('open', function open(){
        console.log("subscriber - ws server connection open");
    });

    ws.on('close', function close(code, msg){
        console.log("subscriber - ws server connection closed with code:" + code);
    });
}

connect();


