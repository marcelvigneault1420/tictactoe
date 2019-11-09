import React, { useState } from 'react';
import Game from './Game';
import Login from './Login';

function Main() {
    const [gameState, setGameState] = useState(0);
    const [name, setName] = useState('');

    const joinHandler = e => {
        e.preventDefault();
        setGameState(1);
    };
    return (
        <div>
            {gameState <= 0 && (
                <Login
                    name={name}
                    setName={setName}
                    joinHandler={joinHandler}
                    gameState={gameState}
                />
            )}
            {gameState === 1 && (
                <Game setGameState={setGameState} name={name} />
            )}
        </div>
    );
}

export default Main;
