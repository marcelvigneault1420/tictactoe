import React, { useState } from 'react';
import Game from './components/Game';
import Login from './components/Login';
import './App.css';

function App() {
    const [gameState, setGameState] = useState(0);
    const [name, setName] = useState('');

    const joinHandler = e => {
        e.preventDefault();
        if (name.length > 0) setGameState(1);
    };
    return (
        <div className="App">
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

export default App;
