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
        <div className='container header-wrap'>
            <button onClick={() => logOut()}>Logout</button>
            <Link className='button nav-item' to='/full-list'>
                Dashboard
            </Link>
            <Link className='button nav-item' to='/users'>
                Users (
                {contextData.userArrayCalc
                    ? contextData.userArrayCalc.length
                    : ''}
                )
            </Link>
            <Link className='button nav-item home' to='/'>
                Atlo
            </Link>
        </div>
    );
}
