import React, { useState } from 'react';
import Game from './Game';

function Main() {
    const [inGame, setInGame] = useState(false);

    return (
        <div>
            <button onClick={() => setInGame(old => !old)}>Play</button>
            {inGame && <Game setInGame={setInGame} />}
        </div>
    );
}

export default Main;
