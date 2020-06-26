import React from 'react';
import {Link} from "react-router-dom";

const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="header__content">
                <div className="header__section header__section_nav_left">
                    <Link className="header__link" to="">Explore</Link>
                    <Link className="header__link" to="">Marketplace</Link>
                </div>
                <div className="header__section header__section_logo">
                    <Link className="header__link" to="">0xbc01n</Link>
                </div>
                <div className="header__section header__section_nav_right">
                    <Link className="header__link" to="">Search</Link>
                    <Link className="header__link" to="">Log in</Link>
                </div>
            </div>   
        </div>
    );
};

export default Header;
