export default class Api {
  #baseUrl;
  #headers;
  constructor(headers) {
    this.#baseUrl = "https://around.nomoreparties.co/v1/group-12";
    this.#headers = headers;
  }

  #checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
    return response.json();
  }

  getUserInfo () {
    return fetch(`${this.#baseUrl}/users/me`, {
      headers: this.#headers
    })
    .then(response => {
      return this.#checkResponse(response);
    })
  }

  getInitialCards() {
    return fetch(`${this.#baseUrl}/cards`, {
      headers: this.#headers
    })
    .then(response => {
      return this.#checkResponse(response);
    })
  }

  getUserAndCardInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  updateProfileInfo(data) {
    return fetch(`${this.#baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.#headers,
      body: JSON.stringify(data)
    })
    .then(response => {
      return this.#checkResponse(response);
    })
  }

  updateAvatar (data) {
    return fetch(`${this.#baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.#headers,
      body: JSON.stringify(data)
    })
    .then(response => {
      return this.#checkResponse(response);
    })
  }

  addCard(data) {
    return fetch(`${this.#baseUrl}/cards`, {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify(data)
    })
    .then(response => {
      return this.#checkResponse(response);
    });
  }

  removeCard(data) {
    return fetch(`${this.#baseUrl}/cards/${data}`, {
      method: "DELETE",
      headers: this.#headers
    })
    .then(response => {
      return this.#checkResponse(response);
    })
  }

  addLike(data) {
    return fetch(`${this.#baseUrl}/cards/likes/${data._id}`, {
      method: "PUT",
      headers: this.#headers
    })
    .then(response => {
      return this.#checkResponse(response);
    })
  }

  removeLike (data) {
    return fetch(`${this.#baseUrl}/cards/likes/${data._id}`, {
      method: "DELETE",
      headers: this.#headers
    })
    .then(response => {
      return this.#checkResponse(response);
    })
  }
}
