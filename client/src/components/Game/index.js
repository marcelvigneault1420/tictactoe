import React from 'react';
import useTTT from '../../hooks/useTictactoe';
import TicTacToe from './TicTacToe';
import Connecting from './Connecting';
import Searching from './Searching';
import { SERVER_URL } from './../../config';
function Game({ setGameState, name }) {
    const { playTurnHandler, game, findSomeoneElseHandler } = useTTT(
        SERVER_URL,
        name
    );

    if (game.gameState === -1) {
        setGameState(-1);
    }

    return (
        <div>
            {game.gameState === 0 && <Connecting />}
            {game.gameState === 1 && <Searching />}
            {game.gameState === 2 && (
                <TicTacToe
                    game={game}
                    playTurnHandler={playTurnHandler}
                    findSomeoneElseHandler={findSomeoneElseHandler}
                />
            )}
        </div>
    );
}

export default Game;
