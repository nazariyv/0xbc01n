import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {ROUTES} from '../types/type';
import {ApplicationContext} from '../controller/context';

const Header: React.FC = () => {
    const {handleLogIn, user, handleLogOut} = useContext(ApplicationContext);
    return (
        <div className='header'>
            <div className='header__content'>
                <div className='header__section header__section_nav_left'>
                    <Link className='header__link' to={ROUTES.MAIN}>Explore</Link>
                    {/*<Link className='header__link' to={ROUTES.MARKETPLACE}>Marketplace</Link>*/}
                </div>
                <div className='header__section header__section_logo'>
                    <Link className='header__link' to={ROUTES.MAIN}>0xbc01n</Link>
                </div>
                <div className='header__section header__section_nav_right'>
                    {user && (
                        <>
                            <Link className='header__link' to={ROUTES.USER_DASHBOARD}>Dashboard</Link>
                            <Link className='header__link' to={ROUTES.USER_PROFILE}>
                                <div className='user-menu'>
                                    Hello
                                    <span className='text__overflow color_green'>
                                        {user.nickname ? user.nickname : user.addr}
                                    </span>
                                </div>
                            </Link>
                            <div onClick={handleLogOut} className='header__link'>Logout</div>
                        </>
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
