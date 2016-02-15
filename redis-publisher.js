var redis = require('redis');
var publisher = redis.createClient();

publisher.publish('test_channel', 'hello');
