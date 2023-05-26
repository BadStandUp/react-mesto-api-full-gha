import React, {useCallback} from "react";
import {NavLink, useNavigate} from 'react-router-dom';

import logo from "../images/logo.svg";

function Header(props) {
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        localStorage.removeItem('jwt');
        navigate('/sign-in', {replace: true});
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
                          to='/sign-in'>Войти</NavLink>}
                {!props.loggedIn && <NavLink className={({isActive}) => `header__link ${isActive ? "header__link_hidden" : ""}`}
                          to='/sign-up'>Зарегистрироваться</NavLink>}

            </div>
        </header>
    )
}

export default Header;