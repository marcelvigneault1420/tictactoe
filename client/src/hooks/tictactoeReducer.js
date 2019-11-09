export const initialState = {
    socket: null,
    yourTurn: false,
    score: 0,
    board: ['', '', '', '', '', '', '', '', ''],
    type: '',
    gameState: 0,
    winStatus: 0
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'CONNECTED':
            return {
                ...initialState,
                gameState: 1,
                socket: action.payload
            };
        case 'JOIN_GAME':
            let { game, socket } = action.payload;

            return {
                ...state,
                socket: socket,
                yourTurn: game.yourTurn,
                score: 0,
                board: ['', '', '', '', '', '', '', '', ''],
                type: game.type,
                gameState: 2
            };
        case 'REFRESH':
            let gameState = action.payload;

            return {
                ...state,
                yourTurn: gameState.yourTurn,
                won: gameState.won,
                score: gameState.score,
                board: gameState.board,
                winStatus: gameState.winStatus,
                type: gameState.type
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
