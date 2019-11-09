import React from 'react';

function TicTacToe({ game, playTurnHandler, findSomeoneElseHandler }) {
    return (
        <div>
            <>
                <p>You're {game.type}</p>
                <p>
                    {game.board.map((type, index) => (
                        <button
                            key={index}
                            onClick={() => playTurnHandler(index)}
                        >
                            {type}
                        </button>
                    ))}
                </p>
                {game.winStatus > 0 && (
                    <div>
                        <button onClick={findSomeoneElseHandler}>
                            Find someone else
                        </button>
                    </div>
                )}
            </>
        </div>
    );
}

export default TicTacToe;
