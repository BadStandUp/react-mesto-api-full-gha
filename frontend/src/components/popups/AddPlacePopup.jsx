import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading, onOverlay}) {

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        setName('');
        setUrl('');
    }, [isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name: name,
            link: url
        })
    }

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleUrlChange(evt) {
        setUrl(evt.target.value);
    }

    return (
        <PopupWithForm name='add-card' title='Новое место' isOpen={isOpen} onClose={onClose}
                       buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} onSubmit={handleSubmit}
                       onOverlay={onOverlay}>
            <input onChange={handleNameChange} value={name || ''} type="text"
                   className="popup__input popup__input_place_name" id="place" name="placeInput" placeholder="Название"
                   required minLength="2" maxLength="30"/>
            <span className="popup__input-error" id="place-error"></span>
            <input onChange={handleUrlChange} value={url || ''} type="url"
                   className="popup__input popup__input_place_url" id="url" name="urlInput"
                   placeholder="Ссылка на картинку" required/>
            <span className="popup__input-error" id="url-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;