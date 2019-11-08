import React, { useState } from 'react';
import Game from './Game';

function Main() {
    const [connected, setConnected] = useState(false);

    return (
        <div>
            <button onClick={() => setConnected(old => !old)}>Play</button>
            {connected && <Game />}
        </div>
    );
}

export default Main;
