import React, {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    const cardLikeButtonClassName = (`element__like-button ${isLiked ? 'element__like-button_active' : ''}`);

    return (
        <article className="element">
            <img src={card.link} alt={card.name} onClick={() => onCardClick(card)} className="element__image"/>
            {isOwn && <button className="element__delete-button" type="button" aria-label="Удалить"
                              onClick={() => onCardDelete(card)}/>}
            <div className="element__caption">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like">
                    <button className={cardLikeButtonClassName} type="button" aria-label="Лайк"
                            onClick={() => onCardLike(card)}/>
                    <span className="element__like-counter">{card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;