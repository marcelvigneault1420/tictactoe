import React from 'react';
import styles from './Login.module.css';

function Login({ joinHandler, name, setName, gameState }) {
    return (
        <form onSubmit={joinHandler}>
            <input
                className={styles.nameInput}
                type="text"
                onChange={e => setName(e.target.value)}
                value={name}
                placeholder="Your name..."
                required
            />
            <button className={styles.buttonInput} type="submit">
                Join
            </button>
            {gameState === -1 && (
                <p className={styles.error}>
                    <span className="error">
                        Unable to connect to the server. Please try again.
                    </span>
                </p>
            )}
        </form>
    );
}

export default Login;
