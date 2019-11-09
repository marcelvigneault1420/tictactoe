module.exports = class Room {
    constructor(pUser1, pUser2) {
        this.user1 = pUser1;
        this.user2 = pUser2;
        this.winner = 0;
        this.name = this.newGuid();
        this.setupGame();
    }

    playerPlayed(turn, playerID) {
        if (this.board[turn.tile] === '') {
            let uPlaying = null;
            let uWaiting = null;

            if (
                turn.type === 1 &&
                this.user1.socket.id === playerID &&
                this.user1.yourTurn
            ) {
                uPlaying = this.user1;
                uWaiting = this.user2;
            } else if (
                turn.type === 2 &&
                this.user2.socket.id === playerID &&
                this.user2.yourTurn
            ) {
                uPlaying = this.user2;
                uWaiting = this.user1;
            }

            if (uPlaying !== null && uWaiting !== null) {
                uPlaying.yourTurn = false;
                uWaiting.yourTurn = true;
                this.board[turn.tile] = uPlaying.type;

                //Calculate tic tac toe
                this.winner = this.isTicTacToe();

                uWaiting.sendMove(
                    { tile: turn.tile, type: uPlaying.type },
                    this.winner
                );

                if (this.winner > 0) {
                    uPlaying.sendEnd(this.winner);
                }
            }
        }
    }

    isTicTacToe() {
        let sum1 = this.board[0] + this.board[1] + this.board[2];
        let sum2 = this.board[3] + this.board[4] + this.board[5];
        let sum3 = this.board[6] + this.board[7] + this.board[8];

        let sum4 = this.board[0] + this.board[3] + this.board[6];
        let sum5 = this.board[1] + this.board[4] + this.board[7];
        let sum6 = this.board[2] + this.board[5] + this.board[8];

        let sum7 = this.board[0] + this.board[4] + this.board[8];
        let sum8 = this.board[2] + this.board[4] + this.board[6];

        if (
            sum1 === 3 ||
            sum2 === 3 ||
            sum3 === 3 ||
            sum4 === 3 ||
            sum5 === 3 ||
            sum6 === 3 ||
            sum7 === 3 ||
            sum8 === 3
        ) {
            return 1;
        }
        if (
            sum1 === 6 ||
            sum2 === 6 ||
            sum3 === 6 ||
            sum4 === 6 ||
            sum5 === 6 ||
            sum6 === 6 ||
            sum7 === 6 ||
            sum8 === 6
        ) {
            return 2;
        }
        if (this.board.filter(x => x === '').length === 0) {
            return 3;
        }

        return 0;
    }

    setupGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];

        this.user1.type = 1;
        this.user2.type = 2;
        this.user1.initGame(this.user2, true);
        this.user2.initGame(this.user1, false);
    }

    newGuid() {
        let sGuid = '';
        for (let i = 0; i < 32; i++) {
            sGuid += Math.floor(Math.random() * 0xf).toString(0xf);
        }
        return sGuid;
    }
};
