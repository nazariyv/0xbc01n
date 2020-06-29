import React, {useContext} from 'react';
import Main from '../main';
import {ApplicationContext} from '../../controller/context';

const UserProfilePage: React.FC = ({ children }) => {
    const {user} = useContext(ApplicationContext);
    return (
        <Main>
            <div className='bounty__create_form'>
                <form>
                    <div className='form__row'>
                        <div className='header'>Hi {user && user.addr}, it is your profile</div>
                    </div>
                    <div className='form__row'>
                        <div className='title'>What would you like people to know about you?</div>
                        <div className='description'>Enter some of your personal details so that the community can get
                            to know you.
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>
                            <label htmlFor='first_name'>First name</label>
                        </div>
                        <div className='form__field'>
                            <input type='text' className='form__input' id='first_name' name='first_name'/>
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>
                            <label htmlFor='last_name'>Last name</label>
                        </div>
                        <div className='form__field'>
                            <input type='text' className='form__input' id='last_name' name='last_name'/>
                        </div>
                    </div>
                    <div className='form__row_separator'/>
                    <div className='form__row'>
                        <div className='title'>What are some of your professional or technical skills?</div>
                        <div className='description'>
                            Enter or select the skills for which you are proficient. This will help others on the
                            network be confident in your ability to fulfill certain types of bounties.
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>
                            <label htmlFor='skills'>Skills</label>
                        </div>
                        <div className='form__field'>
                            <select className='form__select' id='skills' name='skills'>
                                <option value='html'>HTML</option>
                                <option value='JavaScript'>JavaScript</option>
                                <option value='Design'>Design</option>
                            </select>
                        </div>
                    </div>
                    <div className='form__row_separator'/>
                    <div className='form__row'>
                        <div className='title'>Where would you like to receive status notifications about your bounties
                            and fulfillments?
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>
                            <label htmlFor='email'>Contact email</label>
                        </div>
                        <div className='form__field'>
                            <input type='text' className='form__input' id='email' name='email'/>
                        </div>
                    </div>
                    <div className='button_container'>
                        <button className='secondary-button form_button_space'>
                            Cancel
                        </button>
                        <button type='submit' className='action-button'>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </Main>
    );
};

export default UserProfilePage;
