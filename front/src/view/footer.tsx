import React from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../types/type';

const Footer: React.FC = () => (
    <div className='footer'>
        <div className='footer__content'>
            <ul className='list-style-none list'>
                <li className='list-item'>&copy;&nbsp;2020 0xbc01n.</li>
                <li className='list-item'>
                    <Link to={ROUTES.TERMS}>Terms</Link>
                </li>
                <li className='list-item'>
                    <Link to={ROUTES.PRIVACY}>Privacy</Link>
                </li>
            </ul>
        </div>
    </div>
);

export default Footer;
