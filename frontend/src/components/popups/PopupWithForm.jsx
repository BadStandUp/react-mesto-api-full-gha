import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onOverlay}>
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <form className={`popup__form popup__form_${props.name}`} name={props.name} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__save-button" type="submit">{props.buttonText}</button>
                </form>
                <button className="popup__close-button" onClick={props.onClose}
                        type="button" aria-label="Выйти"></button>
            </div>
        </div>
    )
}

export default PopupWithForm;