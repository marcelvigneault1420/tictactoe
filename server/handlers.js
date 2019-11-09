var Room = require('./GameClasses/Room');
var User = require('./GameClasses/User');

var waintingQueue = [];
var roomsUsers = [];

module.exports = function handlersMaker(socket) {
    const handleDisconnect = () => {
        console.log(`DISCONNECT. SocketID: ${socket.id}`);

        let room = roomsUsers[socket.id];

        if (room !== undefined) {
            if (room.user1.socket.id === socket.id) {
                delete roomsUsers[room.user1.socket.id];
                joinQueue(room.user2.socket.id);
            } else if (room.user2.socket.id === socket.id) {
                delete roomsUsers[room.user2.socket.id];
                joinQueue(room.user1.socket.id);
            }
        }
    };

    const handlePlayTurn = turn => {
        let r = roomsUsers[socket.id];

        if (r !== undefined) {
            r.playerPlayed(turn, socket.id);
        } else {
            joinQueue(socket);
        }
    };

    const joinQueue = s => {
        console.log('TEST');
        delete roomsUsers[socket.id];

        var u = new User(socket);
        if (waintingQueue.length === 0) {
            console.log('CONNECT');
            socket.emit('connected', true);
            waintingQueue.push(u);
        } else {
            let u2 = waintingQueue.pop();

            let r = new Room(u, u2);
            roomsUsers[u.socket.id] = r;
            roomsUsers[u2.socket.id] = r;
        }
    };

    const handlePlayerJoinQueue = () => {
        joinQueue(socket);
    };

    return { handleDisconnect, handlePlayTurn, handlePlayerJoinQueue };
};
