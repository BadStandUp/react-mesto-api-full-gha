const BASE_URL = '//backend-mesto.nomoredomains.rocks';

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
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    }).then((res) => getResponse(res));
};

export const authentication = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: `POST`,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({password, email}),
    })
        .then((res) => getResponse(res))
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                return data;
            }
        });
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: `GET`,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => getResponse(res))
        .then((data) => data);
};
