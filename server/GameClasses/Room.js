module.exports = class Room {
    constructor(pUser1, pUser2) {
        this.user1 = pUser1;
        this.user2 = pUser2;

        this.name = this.newGuid();
        this.setupGame();
    }

    playerPlayed(turn, playerID) {
        console.log(`Player ${playerID} played ${turn.tile} with ${turn.type}`);
    }

    setupGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.user1.initGame(this.user2, true, 'X');
        this.user2.initGame(this.user1, true, 'O');
    }

    sendGameInfo() {
        this.user1.sendInfo();
        this.user2.sendInfo();
    }

    newGuid() {
        var sGuid = '';
        for (var i = 0; i < 32; i++) {
            sGuid += Math.floor(Math.random() * 0xf).toString(0xf);
        }
        return sGuid;
    }
};
