import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../types/type';
import Logo from '../components/logo';
import {ApplicationContext} from '../controller/context';
import {getUserName} from '../utils/utils';

const Header: React.FC = () => {
    const {handleLogIn, user, handleLogOut} = useContext(ApplicationContext);
    return (
        <div className='header'>
            <div className='header__content'>
                <div className='header__section header__section_nav_left'>
                    <Link className='header__link' to={ROUTES.MAIN}>Explore</Link>
                </div>
                <div className='header__section header__section_logo'>
                    <Link className='no-link' to={ROUTES.MAIN}>
                        <Logo/>
                    </Link>
                </div>
                <div className='header__section header__section_nav_right'>
                    {user && (
                        <>
                            <Link className='header__link link' to={ROUTES.USER_DASHBOARD}>Dashboard</Link>
                            <Link className='header__link link' to={ROUTES.USER_PROFILE}>
                                <div className='user-menu'>
                                    Hello
                                    <span className='text__overflow color_green'>
                                        {getUserName(user)}
                                    </span>
                                </div>
                            </Link>
                            <div onClick={handleLogOut} className='link header__link'>Logout</div>
                        </>
                    )}
                    {user === undefined && (
                        <div className='header__link link' onClick={handleLogIn}>Log in</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
