module.exports = function handlersMaker(socket) {
    const handleDisconnect = () => {
        console.log(`user ${socket.id} disconnected`);
    };

    const handleMakeMove = moveObj => {
        console.log(moveObj);
    };

    return { handleDisconnect, handleMakeMove };
};
