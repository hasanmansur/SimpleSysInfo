var redis = require('redis');
var subscriber = redis.createClient();

subscriber.on('subscribe', function (channel, count) {
	console.log(channel);
	console.log(count);
});

subscriber.on('message', function (channel, message) {
	console.log(channel);
	console.log(message);
});

subscriber.subscribe('test_channel');
