var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis');
var REDISHOST =  "127.0.0.1" || process.env.REDISHOST;
var REDISDB =  "pricing" || process.env.REDISDB;
var REDISPORT = "6379" || process.env.REDISPORT;
var client = redis.createClient(REDISPORT, REDISHOST);

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('joined', function(data) {
        console.log(data);
        socket.emit('acknowledge', 'Acknowledged');
    });
    socket.on('checkBalance',function(data){
       let a = data.odooid;
     console.log(typeof(a),a)
        console.log(a);
        client.get(a, function (error, result) {
            if (error) {
                 console.log(error);
                 throw error;
            }
            console.log(result)
            console.log(typeof(parseInt(result)))
            console.log(parseInt(result))
            socket.emit('balance', result);
            });
    })
});


 client.on('connect', function() {
    console.log('Redis client connected');
  });
  client.select(parseInt(REDISDB), function(){
    console.log('Selected DB:',REDISDB);
  });
  client.on('error', function (err) {
    console.log('Something went wrong ' + err);
  });
  
http.listen(8080, function(){
    console.log('listening on *:8080');
});