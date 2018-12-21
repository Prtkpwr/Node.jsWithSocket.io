var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('joined', function(data) {
        console.log(data);
        socket.emit('acknowledge', 'Acknowledged');
    });
});

http.listen(8080, function(){
    console.log('listening on *:8080');
});