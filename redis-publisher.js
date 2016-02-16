/**
 * Redis Client
 */
var redis = require("redis");
var publisher = redis.createClient();

if (process.argv[2]) {
    publisher.publish("test_channel", process.argv[2]);        
}
else {
    console.log("argument missing, plz provide a random username");
    publisher.end();
    process.exit();
}

//publisher.publish('test_channel', 'hello');
