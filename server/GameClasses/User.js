module.exports = class User {
    constructor(pSocket) {
        this.socket = pSocket;
        this.name = pSocket.username;
    }

    initGame(pRival, pYourTurn, pType) {
        this.rival = pRival;
        this.yourTurn = pYourTurn;
        this.type = pType;

        this.socket.emit('game_found', {
            type: this.type,
            yourTurn: this.yourTurn,
            rival: this.rival.name
        });
    }

    sendMove(move, winStatus) {
        this.socket.emit('send_move', {
            move,
            winStatus: winStatus
        });
    }

    sendEnd(winStatus) {
        this.socket.emit('send_winner', {
            winStatus: winStatus
        });
    }
};
