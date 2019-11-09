export const initialState = {
    socket: null,
    yourTurn: false,
    board: ['', '', '', '', '', '', '', '', ''],
    gameState: 0,
    winStatus: 0,
    player: null,
    rival: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOST_CONN':
            return { ...initialState, gameState: -1 };
        case 'IN_QUEUE':
            return {
                ...initialState,
                gameState: 1,
                socket: action.payload
            };
        case 'JOIN_GAME':
            let { game, socket } = action.payload;
            return {
                ...initialState,
                socket: socket,
                yourTurn: game.yourTurn,
                player: game.player,
                rival: game.rival,
                gameState: 2
            };
        case 'GET_MOVE':
            let { move, winStatus } = action.payload;

            return {
                ...state,
                yourTurn: true,
                winStatus: winStatus,
                board: [
                    ...state.board.slice(0, move.tile),
                    move.type,
                    ...state.board.slice(move.tile + 1)
                ]
            };
        case 'PLAY_TURN':
            const tile = action.payload;
            if (state.yourTurn && state.board[tile] === '') {
                return {
                    ...state,
                    board: [
                        ...state.board.slice(0, tile),
                        state.player.type,
                        ...state.board.slice(tile + 1)
                    ],
                    yourTurn: false
                };
            } else {
                return state;
            }
        case 'SET_WINNER':
            const winner = action.payload;

            return {
                ...state,
                winStatus: winner.winStatus
            };
        default:
            return state;
    }
};

export default reducer;
