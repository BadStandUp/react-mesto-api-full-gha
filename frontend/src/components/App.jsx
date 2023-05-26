import React, {useCallback, useEffect, useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./popups/EditProfilePopup";
import AddPlacePopup from "./popups/AddPlacePopup";
import EditAvatarPopup from "./popups/EditAvatarPopup";
import ImagePopup from "./popups/ImagePopup";
import ConfirmationPopup from "./popups/ConfirmationPopup";
import InfoToolTip from "./popups/InfoToolTip";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {Route, Routes, useNavigate} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';
import confirm from '../images/confirm-icon.svg';
import error from '../images/error-icon.svg';

function App() {
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [deletedCard, setDeletedCard] = useState(null);
    const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
    const [loggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [text, setText] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        api.getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        api.getUserInfo()
            .then((info) => {
                setCurrentUser(info);
            })
            .catch((err) => console.log(err));
    }, [])

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleDeleteCard(card) {
        setIsConfirmationPopupOpen(true);
        setDeletedCard(card);
    }

    const closeAllPopups = useCallback(() => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
        setIsConfirmationPopupOpen(false);
        setIsInfoToolTipPopupOpen(false);
    }, [])

    function closeOnOverlayClick(evt) {
        if (evt.target.classList.contains('popup')) {
            closeAllPopups();
        }
    }

    const handleCardLike = useCallback((card) => {
        const isLiked = card.likes.some((like) => like._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
                setCards(newCards);
            })
            .catch((err) => console.log(err))
    }, [cards, currentUser])

    const handleCardDelete = useCallback((card) => {
        setIsLoading(true);
        return api.deleteCard(card._id)
            .then(() => {
                setCards(cards.filter((item) => {
                    return item._id !== card._id;
                }))
                closeAllPopups()
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false);
            })
    }, [cards, closeAllPopups])

    const handleUpdateUser = useCallback((data) => {
        setIsLoading(true)
        api.editProfile(data)
            .then((info) => {
                setCurrentUser(info);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [closeAllPopups])

    const handleUpdateAvatar = useCallback((data) => {
        setIsLoading(true);
        api.editAvatar(data)
            .then((info) => {
                setCurrentUser(info);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [closeAllPopups])

    const handleAddPlaceSubmit = useCallback((data) => {
        setIsLoading(true);
        api.addCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [cards, closeAllPopups])

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            auth.getContent(token)
                .then((res) => {
                    if (res) {
                        setEmail(res.data.email);
                        setIsLoggedIn(true);
                        navigate('/', {replace: true});
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [navigate]);

    useEffect(() => {
        if (loggedIn) {
            api.getUserInfo()
                .then((info) => {
                    setCurrentUser(info);
                })
                .catch((err) => {
                    console.log(err)
                })
            api.getInitialCards()
                .then((cards) => {
                    setCards(cards);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [loggedIn])

    function handleRegisterSubmit(email, password) {
        auth.register(email, password)
            .then(() => {
                setText('Вы успешно зарегистрировались!');
                setImage(confirm);
            })
            .then(() => {
                navigate('/sign-in', {replace: true});
            })
            .catch((err) => {
                console.log(err);
                setImage(error);
                setText('Что-то пошло не так! Попробуйте ещё раз.');
            })
            .finally(() => {
                setIsInfoToolTipPopupOpen(true);
            })
    }

    function handleLoginSubmit(email, password) {
        auth.authentication(email, password)
            .then((data) => {
                localStorage.setItem('jwt', data.token);
                setEmail(email);
                setIsLoggedIn(true);
                navigate('/', {replace: true})
                return data;
            })
            .catch((err) => {
                console.log(err);
                setIsInfoToolTipPopupOpen(true);
                setImage(error);
                setText('Что-то пошло не так! Попробуйте ещё раз.');
            })
    }

    return (
        <div className="page">
            <div className="page__content">

                <CurrentUserContext.Provider value={currentUser}>
                    <Header setloggedIn={setIsLoggedIn} email={email} loggedIn={loggedIn}/>

                    <Routes>
                        <Route element={<ProtectedRoute loggedIn={loggedIn}/>}>
                            <Route element={
                                <Main
                                    cards={cards}
                                    onEditAvatar={handleEditAvatarClick}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleDeleteCard}
                                />
                            } path='/' exact/>
                        </Route>
                        <Route path='/sign-up' element={<Register handleRegisterSubmit={handleRegisterSubmit}/>}/>
                        <Route path='/sign-in' element={<Login handleLoginSubmit={handleLoginSubmit}/>}/>
                    </Routes>

                    <Footer/>
                    <EditProfilePopup
                        isLoading={isLoading}
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onOverlay={closeOnOverlayClick}
                        onUpdateUser={handleUpdateUser}
                    />
                    <AddPlacePopup
                        isLoading={isLoading}
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onOverlay={closeOnOverlayClick}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                    <EditAvatarPopup
                        isLoading={isLoading}
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onOverlay={closeOnOverlayClick}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <ImagePopup
                        card={selectedCard}
                        onOverlay={closeOnOverlayClick}
                        onClose={closeAllPopups}
                    />
                    <ConfirmationPopup
                        card={deletedCard}
                        isLoading={isLoading}
                        isOpen={isConfirmationPopupOpen}
                        onClose={closeAllPopups}
                        onOverlay={closeOnOverlayClick}
                        onCardDelete={handleCardDelete}
                    />
                    <InfoToolTip
                        image={image}
                        text={text}
                        isOpen={isInfoToolTipPopupOpen}
                        onClose={closeAllPopups}
                        onOverlay={closeOnOverlayClick}
                    />
                </CurrentUserContext.Provider>

            </div>
        </div>
    );
}

export default App;
