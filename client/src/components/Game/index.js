import React from 'react';
import useTTT from '../../hooks/useTictactoe';
import TicTacToe from './TicTacToe';
import Connecting from './Connecting';
import Searching from './Searching';
function Game({ setInGame }) {
    const { playTurnHandler, game, findSomeoneElseHandler } = useTTT(
        'localhost:4001',
        'Marcel Vigneault'
    );

    if (game.gameState === -1) {
        setInGame(false);
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
