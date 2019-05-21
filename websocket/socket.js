var express = require('express'), app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Sockets events
exports.socket = function () {
	io.on('connection', (socket) => {
		
		socket.on('disconnect', function () {
			io.emit('users-changed', {user: socket.nickname, event: 'left'});
		});
		
		socket.on('set-nickname', (nickname) => {
			socket.nickname = nickname;
			io.emit('users-changed', {user: socket.nickname, event: 'joined'});
		});
		
		socket.on('add-private-message', (message) => {
			io.emit('private-message', {text: message.text, from: socket.nickname, target: message.target, type: 'private', created: new Date()});
		});
		
		socket.on('add-message', (message) => {
			io.emit('message', {text: message.text, from: socket.nickname, type: 'public', created: new Date()});
		});
		
		socket.on('room', function (room) {
			socket.join(room);
			
		});
		
		io.clients((error, clients) => {
			if (error) throw error;
			io.emit('clients', {clients: clients}); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
		});
		
	})
};