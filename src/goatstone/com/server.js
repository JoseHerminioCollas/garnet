// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
server.listen(port, function () {
  console.log('Server listening at port xxx %d', port);
});
io.on('connection', function (socket) {
  	console.log('connection');
	loop(socket)
	socket.on('play', function (data) {
	  console.log('play', data );
	});
	socket.on('stop', function (data) {
	  console.log('stop', data );
	});
	socket.on('disconnect', function () {
	 console.log('disconnect')
	}) 
}) 

function loop(socket){
	console.log('tick' )
	socket.broadcast.emit('tick', {
	  username: socket.username,
	  message: "data" + new Date()
	});
	setTimeout(function(){loop(socket)}, 5000)
}
