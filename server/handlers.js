const Room = require('./GameClasses/Room');
const User = require('./GameClasses/User');

var waintingQueue = [];
var roomsUsers = [];

module.exports = function handlersMaker(socket) {
    const handleDisconnect = () => {
        console.log(`DISCONNECT. SocketID: ${socket.id}`);

        let room = roomsUsers[socket.id];

        waintingQueue = waintingQueue.filter(x => x.socket.id !== socket.id);

        if (room !== undefined) {
            if (room.user1.socket.id === socket.id) {
                delete roomsUsers[room.user1.socket.id];
                joinQueue(room.user2.socket);
            } else if (room.user2.socket.id === socket.id) {
                delete roomsUsers[room.user2.socket.id];
                joinQueue(room.user1.socket);
            }
        }
    };

    const handleQueueAgain = () => {
        joinQueue(socket);
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
        if (s.connected) {
            delete roomsUsers[s.id];

            let u = new User(s);
            if (waintingQueue.length === 0) {
                s.emit('in_queue', true);
                waintingQueue.push(u);
            } else {
                let u2 = waintingQueue.pop();

                if (u2.socket.connected) {
                    let r = new Room(u2, u);
                    roomsUsers[u.socket.id] = r;
                    roomsUsers[u2.socket.id] = r;
                } else {
                    joinQueue(s);
                }
            }
        }
    };

    const handlePlayerJoinQueue = () => {
        joinQueue(socket);
    };

    return {
        handleDisconnect,
        handlePlayTurn,
        handlePlayerJoinQueue,
        handleQueueAgain
    };
};
