/**
 * Redis Publisher Client
 */
var redis = require("redis");
var publisher = redis.createClient();

var os = require('os');
var message;

/**
* Redis connection events listener
*/
publisher.on("ready", function () {
	console.log("publisher is ready");
	setInterval(function () {
	    publisher.publish("test_channel", "Host: " + os.hostname() + ", Free memory: " + os.freemem());
	}, 5000);
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
	console.log("redis server connection has closed");
});



