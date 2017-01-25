var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

//var server = app.listen(process.env.PORT || 8585, function(){
//	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//});
http.listen(8585, function() {
  console.log('listening on 8585');
});
