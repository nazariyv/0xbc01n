import React, {useContext, useCallback} from 'react';
import Main from '../main';
import {ApplicationContext} from '../../controller/context';
import { useHistory } from "react-router-dom";

const BountyCreatePage: React.FC = ({ children }) => {
    const {createBounty, user} = useContext(ApplicationContext);
    const history = useHistory();
    const onFormSubmit = useCallback((evt) => {
        evt.preventDefault();
        const formData = {};

        const data = evt.target.querySelectorAll('input');
        data.forEach(elem => {
            if (elem.name === 'difficult' && elem.checked) {
                formData[elem.name] = elem.value;
            } else if (elem.name === 'expiry'){
                formData[elem.name] = new Date(elem.value).valueOf();
            } else {
                formData[elem.name] = elem.value;
            }
        });
        const text = evt.target.querySelectorAll('textarea');
        text.forEach(elem => {
            formData[elem.name] = elem.value;
        });
        const type = evt.target.querySelectorAll('select');
        type.forEach(elem => {
            formData[elem.name] = elem.value;
        });
        createBounty(formData);
        history.push('/');
    });

    return (
        <Main>
            <div className='bounty__create_form'>
                <form name='create' onSubmit={onFormSubmit}>
                    {user && <input name='issuer' type='hidden' value={user.addr}/>}
                    <div className='form__row'>
                        <div className='header'>Create Bounty</div>
                    </div>
                    <div className='form__row'>
                        <div className='title'>Enter your details about this bounty.</div>
                        <div className='description'>Enter a title and description for your bounty.</div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>
                            <label htmlFor='title'>Title</label>
                        </div>
                        <div className='form__field'>
                            <input type='text' className='form__input' id='title' name='title'/>
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>
                            <label htmlFor='short_desc'>Short description</label>
                        </div>
                        <div className='form__field'>
                            <input type='text' className='form__input' id='short_desc' name='short_desc'/>
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>
                            <label htmlFor='desc'>Description</label>
                        </div>
                        <div className='form__field'>
                            <textarea className='form__textarea' rows={20} id='desc' name='desc'/>
                        </div>
                    </div>
                    <div className='form__row_separator'/>
                    <div className='form__row'>
                        <div className='title'>How should this bounty be classified?</div>
                        <div className='description'>
                            Enter the categories and difficulty level for the bounty.
                            Since difficulty can be fairly subjective, it is helpful to provide more details around
                            required experience within your bounty description.
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>Difficulty</div>
                        <div className='form__field radio_group'>
                            <label htmlFor='beginner'>
                                <input type='radio' id='beginner' name='difficult' value='beginner'/>
                                Beginner
                            </label>
                            <label htmlFor='intermediate'>
                                <input type='radio' id='intermediate' name='difficult' value='intermediate'/>
                                Intermediate
                            </label>
                            <label htmlFor='expert'>
                                <input type='radio' id='expert' name='difficult' value='expert'/>
                                Expert
                            </label>
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>
                            <label htmlFor='type'>Bounty category</label>
                        </div>
                        <div className='form__field'>
                            <select className='form__select' id='type' name='type'>
                                <option value='html'>HTML</option>
                                <option value='JavaScript'>JavaScript</option>
                                <option value='Design'>Design</option>
                            </select>
                        </div>
                    </div>
                    <div className='form__row_separator'/>
                    <div className='form__row'>
                        <div className='title'>When will this bounty be due?</div>
                        <div className='description'>Enter the date and time for this bounty's deadline</div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>
                            <label htmlFor='expiry'>Date (DD/MM/YYYY)</label>
                        </div>
                        <div className='form__field'>
                            <input type='text' className='form__input' id='expiry' name='expiry'/>
                        </div>
                    </div>
                    <div className='form__row_separator'/>
                    <div className='form__row'>
                        <div className='title'>Select payout method and amount.</div>
                        <div className='description'>Select the token and enter the amount you will award for completion
                            of this bounty.
                        </div>
                    </div>
                    <div className='form__row'>
                        <div className='form__label'>
                            <label htmlFor='price'>Amount</label>
                        </div>
                        <div className='form__field'>
                            <input type='text' className='form__input' id='price' name='price'/>
                        </div>
                    </div>
                    <div className='button_container'>
                        <button className='secondary-button form_button_space'>
                            Cancel
                        </button>
                        <button type='submit' className='action-button'>
                            Create Bounty
                        </button>
                    </div>
                </form>
            </div>
        </Main>
    );
};

export default BountyCreatePage;
