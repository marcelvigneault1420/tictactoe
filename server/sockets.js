var io = require('socket.io')();
var handlersMaker = require('./handlers');
var socketServer = server => {
    io.attach(server);

    io.on('connection', function(socket) {
        console.log(`User connected. SocketID: ${socket.id}`);
        handlers = handlersMaker(socket);

        socket.emit('connected', 'Welcome');

        socket.on('disconnect', handlers.handleDisconnect);
        socket.on('make_move', handlers.handleMakeMove);
    });
};

module.exports.socketServer = socketServer;
