var io = require('socket.io')();
var handlersMaker = require('./handlers');
var socketServer = server => {
    io.attach(server);

    io.use(function(socket, next) {
        socket.username = socket.request._query['name'];
        next();
    });

    io.on('connection', function(socket) {
        console.log(
            `CONNECTION. SocketID: ${socket.id}, name: ${socket.username}`
        );

        setTimeout(() => {
            socket.emit('connected', true);
        }, 1000);

        handlers = handlersMaker(socket);

        socket.on('disconnect', handlers.handleDisconnect);
        socket.on('play_turn', handlers.handlePlayTurn);

        handlers.handlePlayerEntered(socket.username);
    });
};

module.exports.socketServer = socketServer;
