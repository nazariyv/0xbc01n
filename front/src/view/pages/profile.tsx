import React, {useContext, useCallback} from 'react';
import Main from '../main';
import {ApplicationContext} from '../../controller/context';
import { useHistory } from 'react-router-dom';

const UserProfilePage: React.FC = ({ children }) => {
    const {user, updateUser} = useContext(ApplicationContext);
    const history = useHistory();
    const onFormSubmit = useCallback((evt) => {
        evt.preventDefault();

        const formData: Record<string, any> = {};
        const formFields = evt.target.querySelectorAll('.form__field');

        formFields.forEach((elem: HTMLInputElement) => {
            if (elem && elem.name) {
                formData[elem.name] = elem.value;
            }
        });
        if (user) {
            updateUser(user.addr, formData);
            history.push('/');
        }
    }, []);
    const onCancel = useCallback(() => {
        history.push('/');
    }, [history]);

    return (
        <Main>
            <div className='bounty__create_form'>
                <form onSubmit={onFormSubmit}>
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
                            <label htmlFor='firstName'>First name</label>
                        </div>
                        <div className='form__field'>
                            <input type='text' className='form__input form__field' id='firstName' name='firstName'/>
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>
                            <label htmlFor='last_name'>Last name</label>
                        </div>
                        <div className='form__field'>
                            <input type='text' className='form__input form__field' id='lastName' name='lastName'/>
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
                            <input type='text' className='form__input form__field' id='email' name='email'/>
                        </div>
                    </div>
                    <div className='button_container'>
                        <button className='secondary-button form_button_space' onClick={onCancel}>
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
