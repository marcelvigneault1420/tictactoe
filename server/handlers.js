module.exports = function handlersMaker(socket) {
    const handleDisconnect = () => {
        console.log(
            `DISCONNECT. SocketID: ${socket.id}, name: ${socket.username}`
        );
    };

    const handlePlayTurn = turn => {
        console.log(turn);
    };

    const handlePlayerEntered = name => {
        console.log(`${name} want to join a room with socketID ${socket.id}`);

        socket.emit('game_found', { yourTurn: true, type: 'X' });
    };

    return { handleDisconnect, handlePlayTurn, handlePlayerEntered };
};
