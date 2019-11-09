import { useReducer, useEffect } from 'react';
import reducer, { initialState } from './tictactoeReducer';
import io from 'socket.io-client';

const useTicTacToe = (url, name) => {
    const [game, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        let canceled = false;
        let socket = null;

        dispatch({ type: 'TRY_CONNECT' });
        socket = io(url, {
            'reconnection': false,
            'query': `name=${name}`,
            'timeout': 10000,
            'connect timeout': 10000
        });

        socket.on('connect_failed', () => {
            dispatch({ type: 'LOST_CONN' });
        });

        socket.on('connect_error', () => {
            dispatch({ type: 'LOST_CONN' });
        });

        socket.on('in_queue', success => {
            if (success && !canceled) {
                dispatch({ type: 'IN_QUEUE', payload: socket });
            }
        });

        socket.on('game_found', game => {
            if (!canceled) {
                dispatch({ type: 'JOIN_GAME', payload: { game, socket } });
            }
        });

        socket.on('send_move', move => {
            if (!canceled) {
                dispatch({ type: 'GET_MOVE', payload: move });
            }
        });

        socket.on('send_winner', winner => {
            if (!canceled) {
                dispatch({ type: 'SET_WINNER', payload: winner });
            }
        });

        socket.on('disconnect', function() {
            if (!canceled) {
                dispatch({ type: 'LOST_CONN' });
            }
        });

        return () => {
            canceled = true;
            if (socket !== null) socket.disconnect();
        };
    }, [url, name]);

    function playTurnHandler(tile) {
        if (game.socket !== null) {
            game.socket.emit('play_turn', { tile, type: game.player.type });
            dispatch({ type: 'PLAY_TURN', payload: tile });
        }
    }

    function findSomeoneElseHandler() {
        if (game.socket !== null) {
            game.socket.emit('queue_again');
            dispatch({ type: 'IN_QUEUE', payload: game.socket });
        }
    }

    return { playTurnHandler, game, findSomeoneElseHandler };
};

export default useTicTacToe;
