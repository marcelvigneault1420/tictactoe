export const initialState = {
    socket: null,
    yourTurn: false,
    won: 'no',
    score: 0,
    board: ['', '', '', '', '', '', '', '', ''],
    type: '',
    gameState: 0
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'CONNECTED':
            if (state.gameState < 1) {
                return {
                    ...initialState,
                    gameState: 1,
                    socket: action.payload
                };
            } else {
                return state;
            }
        case 'JOIN_GAME':
            return {
                ...state,
                socket: action.payload.socket,
                yourTurn: action.payload.game.yourTurn,
                won: 'no',
                score: 0,
                board: ['', '', '', '', '', '', '', '', ''],
                type: action.payload.game.type,
                gameState: 2
            };
        case 'REFRESH':
            return {
                ...state,
                yourTurn: action.payload.yourTurn,
                won: action.payload.won,
                score: action.payload.score,
                board: action.payload.board,
                type: action.payload.type
            };
        case 'PLAY_TURN':
            if (state.yourTurn) {
                return {
                    ...state,
                    board: [
                        ...state.board.slice(0, action.payload),
                        ...state.type,
                        ...state.board.slice(action.payload + 1)
                    ],
                    yourTurn: false
                };
            } else {
                return state;
            }
        default:
            return state;
    }
};

export default reducer;
