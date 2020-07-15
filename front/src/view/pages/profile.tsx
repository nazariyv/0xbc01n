import React, {useContext, useCallback} from 'react';
import {getUserName} from '../../utils/utils';
import {ApplicationContext} from '../../controller/context';
import { useHistory } from 'react-router-dom';

const UserProfilePage: React.FC = ({ children }) => {
    const {user, updateUser} = useContext(ApplicationContext);
    const userName = getUserName(user);
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
    }, [user]);
    const onCancel = useCallback(() => {
        history.push('/');
    }, [history]);

    return (
        <>
            <div className='bounty__create_form'>
                <form onSubmit={onFormSubmit}>
                    <div className='form__row'>
                        <div className='header'>Hi {userName}, it is your profile</div>
                    </div>
                    <div className='form__row'>
                        <div className='title'>What would you like people to know about you?</div>
                        <div className='description'>Enter some of your personal details so that the community can get
                            to know you.
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>
                            <label htmlFor='name'>Name</label>
                        </div>
                        <div className='form__field'>
                            <input type='text' className='form__input form__field' id='name' name='name' value={user && user.name}/>
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>
                            <label htmlFor='fullname'>Full name</label>
                        </div>
                        <div className='form__field'>
                            <input type='text' className='form__input form__field' id='fullname' name='fullname' value={user && user.fullname}/>
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>
                            <label htmlFor='nickname'>Nick name</label>
                        </div>
                        <div className='form__field'>
                            <input type='text' className='form__input form__field' id='nickname' name='nickname' value={user && user.nickname}/>
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>
                            <label htmlFor='about_me'>About me</label>
                        </div>
                        <div className='form__field'>
                            <textarea className='form__textarea form__field' rows={8} id='about_me' name='about_me'  value={user && user.about_me}/>
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
        </>
    );
};

export default UserProfilePage;
