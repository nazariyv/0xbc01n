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
                    <Link className='header__link' to={ROUTES.MAIN}>
                        <div className='logo'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='149' height='40' viewBox='0 0 149 40'>
                                <defs>
                                    <linearGradient id='linear-gradient' x1='0.5' x2='0.5' y2='1' gradientUnits='objectBoundingBox'>
                                        <stop offset='0' stopColor='#6cf7b6'/>
                                        <stop offset='1' stopColor='#0a603c'/>
                                        <stop offset='1' stopColor='#214e3b'/>
                                    </linearGradient>
                                </defs>
                                <g id='Group_6' data-name='Group 6' transform='translate(-427 -418)'>
                                    <g id='Group_7' data-name='Group 7' transform='translate(1)'>
                                        <rect id='Rectangle_12' data-name='Rectangle 12' width='40' height='40' transform='translate(513 418)' fill='#429b76'/>
                                        <g id='Group_8' data-name='Group 8' transform='translate(513 418)'>
                                            <rect id='Rectangle_13' data-name='Rectangle 13' width='40' height='40' opacity='0.467' fill='url(#linear-gradient)'/>
                                        </g>
                                    </g>
                                    <text id='Oxbc' transform='translate(427 451)' fill='#4b4b4b' fontSize='35' fontFamily='HelveticaNeue, Helvetica Neue'><tspan x='0' y='0'>Oxbc</tspan></text>
                                    <text id='n' transform='translate(556 451)' fill='#4b4b4b' fontSize='35' fontFamily='HelveticaNeue, Helvetica Neue'><tspan x='0' y='0'>n</tspan></text>
                                    <text id='_01' data-name='01' transform='translate(518 449)' fill='#fff' fontSize='31' fontFamily='Roboto-Regular, Roboto'><tspan x='0' y='0'>01</tspan></text>
                                </g>
                            </svg>

                        </div>
                    </Link>
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
