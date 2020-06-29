import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import {ApplicationContext} from '../controller/context';

const Modal: React.FC = () => {
    const {modalContent, modalAction} = useContext(ApplicationContext);
    const el = document.querySelector('body');
    return modalContent && el ? ReactDOM.createPortal(
        <>
            <div className='modal'>
                <div className='modal__content'>
                    {modalContent}
                    <div className='modal__content_buttons'>
                        <button className='action-button' onClick={modalAction}>Done</button>
                    </div>
                </div>
            </div>
            <div className='app-overlay'/>
        </>, el
    ) : null;
};

export default Modal;
