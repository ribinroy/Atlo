import './Home.scss';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className='container home-wrap'>
            <Link to='/full-list'>Go to dashboard full</Link>
        </div>
    );
}
