import {apiSettings} from "./constants.jsx";

export default class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    _fetch(url, method, body) {
        return fetch(`${this._url}${url}`, {
            method,
            headers: this._headers,
            body
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    getInitialCards() {
        return this._fetch('/cards', 'GET');
    }

    getUserInfo() {
        return this._fetch('/users/me', 'GET');
    }

    editProfile(data) {
        return this._fetch('/users/me', 'PATCH', JSON.stringify({
            name: data.name,
            about: data.about
        }));
    }

    addCard(data) {
        return this._fetch('/cards', 'POST', JSON.stringify({
            name: data.name,
            link: data.link
        }));
    }

    deleteCard(id) {
        return this._fetch('/cards/' + id, 'DELETE');
    }

    editAvatar(data) {
        return this._fetch('/users/me/avatar', 'PATCH', JSON.stringify({
            avatar: data.avatar
        }))
    }

    setLike(id) {
        return this._fetch('/cards/' + id + '/likes', 'PUT');
    }

    deleteLike(id) {
        return this._fetch('/cards/' + id + '/likes', 'DELETE');
    }

    changeLikeCardStatus(id, isLiked) {
        if (!isLiked) {
            return this.setLike(id)
        } else {
            return this.deleteLike(id)
        }
    }
}

export const api = new Api(apiSettings);