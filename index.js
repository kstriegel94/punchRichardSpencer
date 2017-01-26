var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var game_sockets = {};
var controller_sockets = {};

app.use(express.static(path.join(__dirname, 'public')));

// io.sockets.on('connection', function(socket) {
//   socket.on('game_connect', function() {
//     console.log('game connected');
//
//     game_sockets[socket.id] = {
//       socket: socket,
//       controller_id: undefined
//     };
//
//     socket.emit('game_connected');
//   });
//
//   socket.on('controller_connect', function(game_socket_id){
//     if (game_sockets[game_socket_id] && !game_sockets[game_socket_id].controller_id) {
//     console.log("Controller connected");
//
//     controller_sockets[socket.id] = {
//       socket: socket,
//       game_id: game_socket_id
//     };
//
//     game_sockets[game_socket_id].controller_id = socket.id;
//     game_sockets[game_socket_id].socket.emit("controller_connected", true);
//
//     socket.on('controller_state_change', function(data) {
//       if(game_sockets[game_socket_id]) {
//           game_sockets[game_socket_id].socket.emit('controller_state_change', data);
//       }
//     });
//
//     socket.emit("controller_connected", true);
//   } else {
//     console.log("Controller attempted to connect but failed");
//     socket.emit("controller_connected", false);
//   }
//   });
//
//   socket.on('disconnect', function () {
//
//     // Game
//     if (game_sockets[socket.id]) {
//
//       console.log("Game disconnected");
//
//       if (controller_sockets[game_sockets[socket.id].controller_id]) {
//
//         controller_sockets[game_sockets[socket.id].controller_id].socket.emit("controller_connected", false);
//         controller_sockets[game_sockets[socket.id].controller_id].game_id = undefined;
//       }
//
//       delete game_sockets[socket.id];
//     }
//
//     // Controller
//     if (controller_sockets[socket.id]) {
//
//       console.log("Controller disconnected");
//
//       if (game_sockets[controller_sockets[socket.id].game_id]) {
//
//         game_sockets[controller_sockets[socket.id].game_id].socket.emit("controller_connected", false);
//         game_sockets[controller_sockets[socket.id].game_id].controller_id = undefined;
//       }
//
//       delete controller_sockets[socket.id];
//     }
//   });
// });

// io.on('connection', function(socket) {
//   console.log('a user connected');
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// });

//var server = app.listen(process.env.PORT || 8585, function(){
//	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//});
http.listen(8585, function() {
  console.log('listening on 8585');
});
