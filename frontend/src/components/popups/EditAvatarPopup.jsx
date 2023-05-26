import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading, onOverlay}) {

    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen])

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    return (
        <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isOpen} onClose={onClose}
                       buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} onSubmit={handleSubmit}
                       onOverlay={onOverlay}>
            <input ref={avatarRef} type="url" className="popup__input popup__input_avatar_url" id="avatar"
                   name="avatarInput" placeholder="Ссылка на картинку" required/>
            <span className="popup__input-error" id="avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;