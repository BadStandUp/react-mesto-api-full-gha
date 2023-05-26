import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({card, isLoading, onCardDelete, isOpen, onClose, onOverlay}) {

    function handleSubmit(evt) {
        evt.preventDefault();

        onCardDelete(card);
    }

    return (
        <PopupWithForm name='confirm' title='Вы уверены?' buttonText={isLoading ? 'Удаление...' : 'Да'} isOpen={isOpen}
                       onClose={onClose} onOvelay={onOverlay} onSubmit={handleSubmit}/>
    )
}

export default ConfirmationPopup;