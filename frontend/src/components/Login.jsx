import React, {useState} from "react";

function Login({handleLoginSubmit}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        handleLoginSubmit(email, password);
    }

    function handleEmailChange(evt) {
        setEmail(evt.target.value)
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    return (
        <main className='authentication'>
            <div className='authentication__container'>
                <h2 className='authentication__title'>Вход</h2>
                <form className='authentication__form' name='email' onSubmit={handleSubmit}>
                    <input className='authentication__input' id='email' type="email" placeholder='Email' minLength="2"
                           maxLength="30" value={email || ''} onChange={handleEmailChange} required/>
                    <input className='authentication__input' id='password' type="password" placeholder='Пароль'
                           minLength="2"
                           maxLength="30" value={password || ''} onChange={handlePasswordChange} required/>
                    <button className='authentication__button' type='submit'>Войти</button>
                </form>
            </div>
        </main>

    )
}

export default Login;