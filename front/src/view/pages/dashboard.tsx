import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {ApplicationContext} from '../../controller/context';

const Dashboard: React.FC = () => {
    const {handleLogIn, user} = useContext(ApplicationContext);
    return (
        <div className='dashboard'>
            <div className='dashboard__content'>
                <div className='dashboard_row'>
                    <div className='widget l'>
                        <div className='widget__title'>My Bounties</div>
                        <div className='widget__content'>
                            content
                        </div>
                    </div>
                    <div className='widget l'>
                        <div className='widget__title'>My Activity</div>
                        <div className='widget__content'>
                            content
                        </div>
                    </div>
                </div>
                <div className='dashboard_row'>
                    <div className='widget xl'>
                        <div className='widget__title'>Submissions</div>
                        <div className='widget__content'>
                            content
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
