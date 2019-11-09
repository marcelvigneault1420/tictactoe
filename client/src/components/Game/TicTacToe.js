import React from 'react';
import styles from './Game.module.css';

function TicTacToe({ game, playTurnHandler, findSomeoneElseHandler }) {
    let textTitle = '';

    if (game.winStatus === 3) {
        textTitle = 'Draw';
    } else if (game.winStatus === game.player.type) {
        textTitle = 'You win';
    } else if (game.winStatus === 0) {
        if (game.yourTurn) {
            textTitle = 'Your turn';
        } else {
            textTitle = `${game.rival.name} turn`;
        }
    } else {
        textTitle = 'You lost';
    }
    return (
        <div className={styles.boardContainer}>
            <h2>{textTitle}</h2>
            <div className={styles.board}>
                {game.board.map((type, index) => (
                    <button
                        className={styles.tile}
                        key={index}
                        onClick={() => playTurnHandler(index)}
                    >
                        {type === 1 ? 'X' : type === 2 ? 'O' : ''}
                    </button>
                ))}
            </div>
            <button
                className={styles.endGameButtons}
                onClick={findSomeoneElseHandler}
            >
                {game.winStatus > 0 ? 'Find someone else' : 'Abandon'}
            </button>
        </div>
    );
}

export default TicTacToe;
