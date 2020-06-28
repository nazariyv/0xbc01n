import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../types/type';
import {ApplicationContext} from '../controller/context';

const Header: React.FC = () => {
    const {handleLogIn, user} = useContext(ApplicationContext);
    return (
        <div className='header'>
            <div className='header__content'>
                <div className='header__section header__section_nav_left'>
                    <Link className='header__link' to={ROUTES.EXPLORE}>Explore</Link>
                    <Link className='header__link' to={ROUTES.MARKETPLACE}>Marketplace</Link>
                </div>
                <div className='header__section header__section_logo'>
                    <Link className='header__link' to={ROUTES.MAIN}>0xbc01n</Link>
                </div>
                <div className='header__section header__section_nav_right'>
                    <Link className='header__link' to=''>Search</Link>
                    {user && (
                        <Link className='header__link' to={ROUTES.USER_PROFILE}>
                            <div className='user-menu'>
                                Hello <span className='text__overflow color_green'>{user.publicAddress}</span>
                            </div>
                        </Link>
                    )}
                    {user === undefined && (
                        <div className='header__link' onClick={handleLogIn}>Log in</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
