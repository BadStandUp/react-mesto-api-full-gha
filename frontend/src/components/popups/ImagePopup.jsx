import React from "react";

function ImagePopup({card, onClose, onOverlay}) {
    return (
        <div className={`popup popup_zoom-image ${card ? 'popup_opened' : ''}`} onClick={onOverlay}>
            <div className="popup__figure-container">
                <figure className="popup__figure">
                    <img src={card?.link} alt={card?.name} className="popup__image"/>
                    <figcaption className="popup__caption">{card?.name}</figcaption>
                </figure>
                <button className="popup__close-button popup__close-button_zoom-image" type="button" aria-label="Выйти"
                        onClick={onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;