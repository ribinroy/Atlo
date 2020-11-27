import './Header.scss';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { resetAuthentication } from './../../utilities';
import AtloContext from '../../store/Context';

export default function Header() {
    const contextData = useContext(AtloContext);
    const history = useHistory();

    function logOut() {
        resetAuthentication();
        contextData.setCurrentUser([]);
        window.location.reload();
    }
    return (
        <div className='container home-wrap'>
            <Link className='button nav-item' to='/'>
                Go Home
            </Link>
            <Link className='button nav-item' to='/full-list'>
                Go to dashboard full
            </Link>
            <button onClick={() => logOut()}>Logout</button>
        </div>
    );
}
