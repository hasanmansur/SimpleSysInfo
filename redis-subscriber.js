/**
 * Redis Subscriber Client
 */
var redis = require("redis");
var subscriber = redis.createClient();

/**
* Connection events listener
*/
subscriber.on("ready", function () {
	console.log("subscriber is ready");
});

subscriber.on("connect", function () {
	console.log("subscriber is connected to redis server");
});

subscriber.on("error", function (e) {
	console.log(e);
});

subscriber.on("reconnecting", function (r) {
	console.log("Trying to reconnect..." + " Attempt#" + r.attempt + ", Delay: " + r.delay + "ms");
});

subscriber.on("end", function () {
	console.log("Server connection has closed");
});

/**
* Subscribe events listener
*/
subscriber.on("subscribe", function (channel, count) {
	console.log("subscribes to channel: " + channel);
	console.log("total channel subscription: " + count);
});

subscriber.on("message", function (channel, message) {
	console.log("-----------------------------------------------");
	console.log("Channel: " + channel);
	console.log("msg:" + message);
	console.log("-----------------------------------------------");
	subscriber.publish("another", "got u");
});

/**
* Channel subscription
*/
subscriber.subscribe("test_channel");
