import React, { useState, useEffect } from 'react';
import './PopUp.scss';

export default function PopUp({ visible, children, onClose, responsive }) {
    const [showData, setShowData] = useState(false);
    useEffect(() => {
        if (visible) {
            setShowData(true);
        } else {
            if (showData) {
                setTimeout(() => {
                    setShowData(false);
                }, 600);
            }
        }
    }, [showData, visible]);

    return (
        <div className={'pop-up-wrap' + (visible ? ' active' : '')}>
            <div
                className={
                    'pop-up-box ' + (visible ? ' active ' : '') + responsive
                }>
                <div className='header-wrap'>
                    <div className='close-button' onClick={() => onClose()}>
                        ✕
                    </div>
                </div>
                {showData ? children : ''}
            </div>
        </div>
    );
}
