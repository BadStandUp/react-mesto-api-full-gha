import React, {useContext, useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading, onOverlay}) {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about)
    }, [currentUser, isOpen])

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
            name: name,
            about: description
        })
    }

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    return (
        <PopupWithForm name='profile-edit' title='Редактировать профиль' isOpen={isOpen} onClose={onClose}
                       buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} onSubmit={handleSubmit}
                       onOverlay={onOverlay}>
            <input onChange={handleNameChange} value={name || ''} type="text"
                   className="popup__input popup__input_data_name" id="name" name="nameInput" placeholder="Имя" required
                   minLength="2" maxLength="40"/>
            <span className="popup__input-error" id="name-error"></span>
            <input onChange={handleDescriptionChange} value={description || ''} type="text"
                   className="popup__input popup__input_data_about" id="about" name="aboutInput" placeholder="О себе"
                   required minLength="2" maxLength="200"/>
            <span className="popup__input-error" id="about-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;