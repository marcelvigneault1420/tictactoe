module.exports = class User {
    constructor(pSocket) {
        this.socket = pSocket;
        this.name = pSocket.username;
    }

    initGame(pRival, pYourTurn) {
        this.rival = pRival;
        this.yourTurn = pYourTurn;
        this.socket.emit('game_found', {
            player: { name: this.name, type: this.type },
            yourTurn: this.yourTurn,
            rival: { name: this.rival.name, type: this.rival.type }
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
