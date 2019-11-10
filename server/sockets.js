const io = require('socket.io')();
const handlersMaker = require('./handlers');
const socketServer = server => {
    io.attach(server);

    //io.set('origins','*:*');
    io.use(function(socket, next) {
        socket.username = socket.request._query['name'];
        next();
    });

    io.on('connection', function(socket) {
        console.log(`CONNECTION. SocketID: ${socket.id}`);
        handlers = handlersMaker(socket);

        socket.on('play_turn', handlers.handlePlayTurn);
        socket.on('disconnect', handlers.handleDisconnect);
        socket.on('queue_again', handlers.handleQueueAgain);

        handlers.handlePlayerJoinQueue(socket.username);
    });
};

module.exports.socketServer = socketServer;
