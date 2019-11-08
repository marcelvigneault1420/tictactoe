import { useReducer, useEffect } from 'react';
import io from 'socket.io-client';

const initialState = {
    socket: null,
    play: false,
    won: 'no',
    score: 0,
    board: ['', '', '', '', '', '', '', '', ''],
    type: ''
};

const reducer = (state, action) => {
    console.log('enter', action);
    switch (action.type) {
        case 'connect':
            console.log('Connect');
            return {
                ...state,
                play: true,
                won: 'no',
                board: ['', '', '', '', '', '', '', '', ''],
                type: 'X',
                socket: action.payload
            };
        case 'make_move':
            if (state.play) {
                return {
                    ...state,
                    board: [
                        ...state.board.slice(0, action.payload),
                        ...state.type,
                        ...state.board.slice(action.payload + 1)
                    ],
                    play: false
                };
            }
        default:
            return state;
    }
};

const useTicTacToe = url => {
    const [game, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log('CONNECT');
        dispatch({ type: 'connect', payload: url });
        return () => {
            dispatch({ type: 'disconnect' });
        };
    }, []);

    const make_move = tile => {
        dispatch({ type: 'make_move', payload: tile });
    };
    return { make_move, game };
};

export default useTicTacToe;
