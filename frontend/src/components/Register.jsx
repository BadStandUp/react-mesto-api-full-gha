import React, {useCallback, useState} from "react";
import {Link} from "react-router-dom";

function Register({handleRegisterSubmit}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        handleRegisterSubmit(email, password);
    }

    const handleEmailChange = useCallback((evt) => {
        setEmail(evt.target.value)
    }, [])

    const handlePasswordChange = useCallback((evt) => {
        setPassword(evt.target.value);
    }, [])

    return (
        <main className='authentication'>
            <div className='authentication__container'>
                <h2 className='authentication__title'>Регистрация</h2>
                <form className='authentication__form' name='auth' onSubmit={handleSubmit}>
                    <input className='authentication__input' id='email' type="email" placeholder='Email' minLength="2"
                           maxLength="30" value={email || ''} onChange={handleEmailChange} required/>
                    <input className='authentication__input' id='password' type="password" placeholder='Пароль'
                           minLength="2"
                           maxLength="30" value={password || ''} onChange={() => handlePasswordChange} required/>
                    <button className='authentication__button' type='submit'>Зарегистрироваться</button>
                </form>
                <Link className='authentication__link' to='/sign-in'>Уже зарегистрированы? Войти</Link>
            </div>
        </main>

    )
}

export default Register;