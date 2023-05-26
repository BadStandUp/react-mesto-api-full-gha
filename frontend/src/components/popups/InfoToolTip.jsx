import React from "react";

function InfoToolTip(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onOverlay}>
            <div className="popup__container popup__container_tool-tip">
                <img className='popup__icon' src={props.image} alt=""/>
                <h2 className="popup__title popup__title_tool-tip">{props.text}</h2>
                <button className="popup__close-button" onClick={props.onClose}
                        type="button" aria-label="Выйти"></button>
            </div>
        </div>
    )
}

export default InfoToolTip