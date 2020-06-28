import React from 'react';

const Modal: React.FC = ({ children }) => (
    <>
        <div className='modal'>
            <div className='modal__content'>
                {children}
                <div className='modal__content_buttons'/>
            </div>
        </div>
        <div className='app-overlay'/>
    </>
);

export default Modal;
