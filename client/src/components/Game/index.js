import React from 'react';
import useTTT from '../../hooks/useTictactoe';
import TicTacToe from './TicTacToe';
import { SERVER_URL } from './../../config';
import Loading from './Loading';
import PlayerInfo from './PlayerInfo';
import styles from './Game.module.css';
function Game({ setGameState, name }) {
    const { playTurnHandler, game, findSomeoneElseHandler } = useTTT(
        SERVER_URL,
        name
    );

    if (game.gameState === -1) {
        setGameState(-1);
    }

    return (
        <>
            {game.gameState === 0 && <Loading text="Connecting to server..." />}
            {game.gameState === 1 && <Loading text="Searching for a game..." />}
            {game.gameState === 2 && (
                <div className={styles.container}>
                    <PlayerInfo player={game.player} isRival={false} />
                    <TicTacToe
                        game={game}
                        playTurnHandler={playTurnHandler}
                        findSomeoneElseHandler={findSomeoneElseHandler}
                    />
                    <PlayerInfo player={game.rival} isRival={true} />
                </div>
            )}
        </>
    );
}

export default Game;
