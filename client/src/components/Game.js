import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import useTTT from '../hooks/useTictactoe';
function Game() {
    // useEffect(() => {
    //     const soc = io('localhost');
    //     soc.on('connected', mess => console.log(mess));
    //     return () => {
    //         soc.disconnect();
    //     };
    // }, []);
    const { make_move, game } = useTTT('localhost');

    console.log('REFRESH');
    var rows = new Array(9).fill(0).map((zero, index) => (
        <button key={index} onClick={() => make_move(index)}>
            {index}
        </button>
    ));

    return (
        <div>
            <p>{rows}</p>
            <p>{JSON.stringify(game)}</p>
        </div>
    );
}

export default Game;
