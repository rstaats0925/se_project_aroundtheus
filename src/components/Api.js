export default class Api {
  #baseUrl;
  #headers;
  constructor(headers) {
    this.#baseURL = "https://around.nomoreparties.co";
    this.#headers = headers;
  }

  #checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
    return response.json();
  }

  getUserInfo () {
    return fetch(`${this.#baseUrl}/v1/group-12/users/me`, {
      headers: this.#headers
    })
    .then(response => {
      this.#checkResponse(response);
    })
    .catch(err => {
      console.error(err);
    })
  }

  getInitialCards() {
    return fetch(`${this.#baseUrl}/v1/group-12/cards`, {
      headers: this.#headers
    })
    .then(response => {
      this.#checkResponse(response);
    })
    .catch(err => {
      console.error(err);
    })
  }

  getUserAndCardInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  updateProfileInfo(data) {
    return fetch(`${this.#baseUrl}/v1/group-12/users/me`, {
      method: "PATCH",
      headers: this.#headers,
      body: JSON.stringify(data)
    })
    .then(response => {
      this.#checkResponse(response);
    })
  }

  updateAvatar (data) {
    return fetch(`${this.#baseUrl}/v1/group-12/users/me/avatar`, {
      method: "PATCH",
      headers: this.#headers,
      body: JSON.stringify(data)
    })
    .then(response => {
      this.#checkResponse(response);
    })
  }

  addCard(data) {
    return fetch(`${this.#baseUrl}/v1/group-12/cards`, {
      method: "POST",
      headers: this.#headers,
      body: JSON.stringify(data)
    })
    .then(response => {
      this.#checkResponse(response);
    });
  }

  removeCard(data) {
    return fetch(`${this.#baseUrl}/v1/group-12/cards/${data._id}`, {
      method: "DELETE",
      headers: this.#headers
    })
    .then(response => {
      this.#checkResponse(response);
    })
  }

  addLike(data) {
    return fetch(`${this.#baseUrl}/v1/group-12/cards/likes/${data._id}`, {
      method: "PUT",
      headers: this.#headers
    })
    .then(response => {
      this.#checkResponse(response);
    })
  }

  removeLike (data) {
    return fetch(`${this.#baseUrl}/v1/group-12/cards/likes/${data._id}`, {
      method: "DELETE",
      headers: this.#headers
    })
    .then(response => {
      this.#checkResponse(response);
    })
  }
}
