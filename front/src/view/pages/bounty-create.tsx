import React from 'react';
import Main from '../main';

const BountyCreatePage: React.FC = ({ children }) => (
    <Main>
        <div className='bounty__create_form'>
            <form>
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
                        <label htmlFor='short_description'>Short description</label>
                    </div>
                    <div className='form__field'>
                        <input type='text' className='form__input' id='short_description' name='short_description'/>
                    </div>
                </div>
                <div className='form__row'>
                    <div className='form__label'>
                        <label htmlFor='description'>Description</label>
                    </div>
                    <div className='form__field'>
                        <textarea className='form__textarea' rows={20} id='description' name='description'/>
                    </div>
                </div>
                <div className='form__row_separator'/>
                <div className='form__row'>
                    <div className='title'>Who will be the primary contact for bounty questions and submissions?</div>
                </div>
                <div className='form__row'>
                    <div className='form__label'>
                        <label htmlFor='contact_name'>Contact name</label>
                    </div>
                    <div className='form__field'>
                        <input type='text' className='form__input' id='contact_name' name='contact_name'/>
                    </div>
                </div>
                <div className='form__row'>
                    <div className='form__label'>
                        <label htmlFor='contact_email'>Contact email</label>
                    </div>
                    <div className='form__field'>
                        <input type='text' className='form__input' id='contact_email' name='contact_email'/>
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
                        <label htmlFor='difficulty_choice_1'>
                            <input type='radio' id='difficulty_choice_1' name='difficult' value='beginner'/>
                            Beginner
                        </label>
                        <label htmlFor='difficulty_choice_2'>
                            <input type='radio' id='difficulty_choice_2' name='difficult' value='intermediate'/>
                            Intermediate
                        </label>
                        <label htmlFor='difficulty_choice_3'>
                            <input type='radio' id='difficulty_choice_3' name='difficult' value='expert'/>
                            Expert
                        </label>
                    </div>
                </div>
                <div className='form__row'>
                    <div className='form__label'>
                        <label htmlFor='bounty_category'>Bounty category</label>
                    </div>
                    <div className='form__field'>
                        <select className='form__select' id='bounty_category' name='bounty_category'>
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
                        <label htmlFor='date'>Date (DD/MM/YYYY)</label>
                    </div>
                    <div className='form__field'>
                        <input type='text' className='form__input' id='date' name='date'/>
                    </div>
                </div>
                <div className='form__row_separator'/>
                <div className='form__row'>
                    <div className='title'>Select payout method and amount.</div>
                    <div className='description'>Select the token and enter the amount you will award for completion of this bounty.</div>
                </div>
                <div className='form__row'>
                    <div className='form__label'>
                        <label htmlFor='amount'>Amount</label>
                    </div>
                    <div className='form__field'>
                        <input type='text' className='form__input' id='amount' name='amount'/>
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

export default BountyCreatePage;
