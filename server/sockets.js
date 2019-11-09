var io = require('socket.io')();
var handlersMaker = require('./handlers');
var socketServer = server => {
    io.attach(server);

    io.use(function(socket, next) {
        socket.username = socket.request._query['name'];
        next();
    });

    io.on('connection', function(socket) {
        console.log(`CONNECTION. SocketID: ${socket.id}`);

        handlers = handlersMaker(socket);

        socket.on('play_turn', handlers.handlePlayTurn);
        socket.on('disconnect', handlers.handleDisconnect);

        handlers.handlePlayerJoinQueue(socket.username);
    });
};

module.exports.socketServer = socketServer;
