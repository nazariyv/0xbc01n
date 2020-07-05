import React from 'react';

const Logo: React.FC = ({ children }) => (
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
);

export default Logo;
