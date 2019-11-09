module.exports = class User {
    constructor(pSocket, pName) {
        this.socket = pSocket;
        this.name = pName;
        this.score = 0;
    }

    initGame(pRival, pYourTurn, pType, pPlayMoveEvent) {
        this.rival = pRival;
        this.yourTurn = pYourTurn;
        this.type = pType;
        this.playMoveEvent = pPlayMoveEvent;

        this.socket.emit('game_found', {
            board: ['', '', '', '', '', '', '', '', ''],
            type: this.type,
            yourTurn: this.yourTurn,
            rival: { name: this.rival.name, score: this.rival.score }
        });
    }

    playMove() {
        this.playMoveEvent(move, this.type);
    }

    sendGameInfo(board, winStatus) {
        this.socket.emit('refresh', {
            board,
            winStatus: winStatus,
            yourTurn: this.yourTurn
        });
    }
};
