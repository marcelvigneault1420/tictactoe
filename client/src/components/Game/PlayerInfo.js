import React from 'react';
import styles from './Game.module.css';

function PlayerInfo({ player, isRival }) {
    return (
        <div className={styles.playerCard}>
            <h1>{isRival ? 'Rival' : 'You'}</h1>
            <p>{player.name}</p>
            <div className={styles.type}>{player.type === 1 ? 'X' : 'O'}</div>
        </div>
    );
}

export default PlayerInfo;
