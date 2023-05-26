const BASE_URL = 'https://auth.nomoreparties.co';

function getResponse(res) {
    if (!res.ok) {
        return Promise.reject(res.status)
    }
    return res.json()
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: `POST`,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({password, email}),
    }).then((res) => getResponse(res));
};

export const authentication = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: `POST`,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({password, email}),
    }).then((res) => getResponse(res));
};


export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: `GET`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => getResponse(res));
};