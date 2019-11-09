import React from 'react';

function Login({ joinHandler, name, setName, gameState }) {
    return (
        <div>
            <form onSubmit={joinHandler}>
                <input
                    type="text"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    placeholder="Your name..."
                />
                <button type="submit">Join</button>
            </form>
            {gameState === -1 && (
                <p>Unable to connect to the server. Please try again.</p>
            )}
        </div>
    );
}

export default Login;
