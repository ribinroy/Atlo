import './Home.scss';
import React, { useContext } from 'react';
import AtloContext from './../../store/Context';
import ListAllUsers from './ListUsersTodayData';

export default function Home() {
    const contextData = useContext(AtloContext);

    return (
        <div className='container home-wrap'>
            <ListAllUsers />
        </div>
    );
}
