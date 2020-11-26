import './Header.scss';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className='container home-wrap'>
            <Link className='nav-item' to='/'>
                Go Home
            </Link>
            <Link className='nav-item' to='/full-list'>
                Go to dashboard full
            </Link>
        </div>
    );
}
