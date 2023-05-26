export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const popupConfig = {
  editProfilePopup: '.popup_profile-edit',
  addCardPopup: '.popup_add-card',
  avatarPopup: '.popup_avatar',
  confirmationPopup: '.popup_confirm',
  imagePopup: '.popup_zoom-image'
}

export const defaultContainer = '.elements';
export const defaultTemplate = '#card-template';


export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileCloseButton = document.querySelector('.popup__close-button_profile-edit');

export const confirmCloseButton = document.querySelector('.popup__close-button_confirm');

export const avatarEditButton = document.querySelector('.profile__avatar-container');
export const avatarCloseButton = document.querySelector('.popup__close-button_avatar');

export const buttonForOpenAddCardPopup = document.querySelector('.profile__add-button');
export const buttonForCloseAddCardPopup = document.querySelector('.popup__close-button_add-card');

export const avatarFormElement = document.querySelector('.popup__form_avatar');
export const addCardFormElement = document.querySelector('.popup__form_add-card');
export const editProfileFormElement = document.querySelector('.popup__form_profile-edit');

export const nameInput = document.querySelector('.popup__input_data_name');
export const aboutInput = document.querySelector('.popup__input_data_about');

export const apiSettings = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: '63f40bb4-bb4e-4f4f-b3cc-e405ac006139',
    'Content-Type': 'application/json'
  }
}
