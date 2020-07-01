import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {ApplicationContext} from '../../controller/context';

const Dashboard: React.FC = () => {
    const {handleLogIn, user} = useContext(ApplicationContext);
    return (
        <div className='dashboard'>
            <div className='dashboard__content'>
                dashboard
            </div>
        </div>
    );
};

export default Dashboard;
