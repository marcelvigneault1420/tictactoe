export const initialState = {
    socket: null,
    yourTurn: false,
    board: ['', '', '', '', '', '', '', '', ''],
    type: '',
    gameState: 0,
    winStatus: 0
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOST_CONN':
            return { ...initialState, gameState: -1 };
        case 'IN_QUEUE':
            return {
                ...initialState,
                gameState: 1,
                winStatus: 0,
                socket: action.payload
            };
        case 'JOIN_GAME':
            let { game, socket } = action.payload;

            return {
                ...state,
                socket: socket,
                yourTurn: game.yourTurn,
                board: ['', '', '', '', '', '', '', '', ''],
                type: game.type,
                winStatus: 0,
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
                    move.type === 1 ? 'X' : 'O',
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
                        state.type === 1 ? 'X' : 'O',
                        ...state.board.slice(tile + 1)
                    ],
                    yourTurn: false
                };
            } else {
                return state;
            }
        case 'SET_WINNER':
            const winner = action.payload;
            let ws = 0;
            if (winner === state.type) {
                ws = 1;
            } else if (winner === 3) {
                ws = 3;
            } else {
                ws = 2;
            }

            return {
                ...state,
                winStatus: ws
            };
        default:
            return state;
    }
};

export default reducer;
