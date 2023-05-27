import React, {useCallback} from "react";
import {NavLink, useNavigate} from 'react-router-dom';

import logo from "../images/logo.svg";

function Header(props) {
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        localStorage.removeItem('jwt');
        navigate('/signin', {replace: true});
        props.setloggedIn(false);
    }, [props, navigate])

    return (
        <header className="header">
            <img alt="Лого" className="header__logo" src={logo}/>
            <div className='header__container'>

                {props.loggedIn && <p className='header__link'>{props.email}</p>}

                <NavLink className={({isActive}) => `header__link ${isActive ? "header__link_active" : "header__link_hidden"}`}
                    to='/' onClick={() => handleLogout()}>Выйти</NavLink>
                {!props.loggedIn && <NavLink className={({isActive}) => `header__link ${isActive ? "header__link_hidden" : ""}`}
                          to='/signin'>Войти</NavLink>}
                {!props.loggedIn && <NavLink className={({isActive}) => `header__link ${isActive ? "header__link_hidden" : ""}`}
                          to='/signup'>Зарегистрироваться</NavLink>}

            </div>
        </header>
    )
}

export default Header;