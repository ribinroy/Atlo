import './Footer.scss';
import React from 'react';

export default function Footer() {
    return (
        <div className='container footer-wrap'>
            <div className='developers'>
                <span>Developed By </span>{' '}
                <a
                    href='https://www.linkedin.com/in/ribinroy/'
                    rel='noreferrer'
                    target='_blank'>
                    Ribin Roy
                </a>{' '}
                |{' '}
                <a
                    href='https://www.linkedin.com/in/nikhilbiju/'
                    rel='noreferrer'
                    target='_blank'>
                    Nikhil Biju
                </a>
            </div>
        </div>
    );
}
