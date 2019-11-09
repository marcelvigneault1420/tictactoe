import React from 'react';
import styles from './Loading.module.css';

function Loading({ text }) {
    return (
        <div className={styles.container}>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p>{text}</p>
        </div>
    );
}

export default Loading;
