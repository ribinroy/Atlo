import './Home.scss';
import React, { useContext } from 'react';
import AtloContext from './../../store/Context';
import AddUserComponent from './AddUserComponent';
import ListAllUsers from './ListAllUsers';

export default function Home() {
    const contextData = useContext(AtloContext);
    return (
        <div className='container home-wrap'>
            <AddUserComponent />
            <ListAllUsers />
        </div>
    );
}
