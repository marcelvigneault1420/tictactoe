import { useReducer, useEffect } from 'react';
import reducer, { initialState } from './tictactoeReducer';
import io from 'socket.io-client';

const useTicTacToe = (url, name) => {
    const [game, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log('INIT REDUCER');
        let canceled = false;

        dispatch({ type: 'TRY_CONNECT' });
        const socket = io(url, {
            query: `name=${name}`
        });

        socket.on('connected', success => {
            if (success && !canceled) {
                dispatch({ type: 'CONNECTED', payload: socket });
            }
        });

        socket.on('game_found', game => {
            if (!canceled) {
                dispatch({ type: 'JOIN_GAME', payload: { game, socket } });
            }
        });

        socket.on('refresh', game => {
            if (!canceled) {
                dispatch({ type: 'REFRESH', payload: game });
            }
        });

        return () => {
            canceled = true;
            if (socket !== null) socket.disconnect();
        };
    }, []);

    function play_turn(tile) {
        if (game.socket !== null) {
            game.socket.emit('play_turn', { tile, type: game.type });
            dispatch({ type: 'PLAY_TURN', payload: tile });
        }
    }

    return { play_turn, game };
};

export default useTicTacToe;
