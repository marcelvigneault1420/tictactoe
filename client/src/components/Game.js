import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import useTTT from '../hooks/useTictactoe';
function Game() {
    const { play_turn, game } = useTTT('localhost:4001', 'Marcel Vigneault');

    var rows = new Array(9).fill(0).map((zero, index) => (
        <button key={index} onClick={() => play_turn(index)}>
            {index}
        </button>
    ));

    return (
        <div>
            {game.gameState == 0 && <p>Connecting...</p>}
            {game.gameState == 1 && <p>Searching for a game...</p>}
            {game.gameState == 2 && <p>{rows}</p>}
        </div>
    );
}

export default Game;
