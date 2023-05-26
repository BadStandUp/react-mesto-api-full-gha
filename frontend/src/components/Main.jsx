import React, {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar-container" onClick={onEditAvatar}>
                        <img alt="Аватар" className="profile__avatar" src={currentUser.avatar}/>
                    </div>
                    <div className="profile__wrapper">
                        <div className="profile__text-container">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button className="profile__edit-button" type="button" aria-label="Редактирование профиля"
                                    onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить карточку"
                        onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cards?.map((card) => (
                    <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike}
                          onCardDelete={onCardDelete}/>
                ))}
            </section>
        </main>
    )
}

export default Main;