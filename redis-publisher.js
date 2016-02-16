/**
 * Redis Publisher Client
 */
var redis = require("redis");
var publisher = redis.createClient();

/**
* Connection events listener
*/
publisher.on("ready", function () {
	console.log("publisher is ready");
});

publisher.on("connect", function () {
	console.log("publisher is connected to redis server");
});

publisher.on("error", function (e) {
	console.log(e);
});

publisher.on("reconnecting", function (r) {
	console.log("Trying to reconnect..." + " Attempt#" + r.attempt + ", Delay: " + r.delay + "ms");
});

publisher.on("end", function () {
	console.log("Server connection has closed");
});

if (process.argv[2]) {
    publisher.publish("test_channel", process.argv[2]);        
}
else {
    console.log("argument missing, plz provide a random username");
    publisher.end();
    process.exit();
}

publisher.subscribe("another");
