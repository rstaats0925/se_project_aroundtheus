export default class Api {
  constructor() {
    this.baseURL = "https://around.nomoreparties.co";
  }

  #checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
    return response.json();
  }

  getUserInfo () {
    return fetch(`${this.baseURL}/v1/group-12/users/me`, {
      headers: {
        authorization: "397bd50b-9f39-4bee-ad9c-11e69aa20ec4"
      }
    })
    .then(response => {
      this.#checkResponse(response);
    })
    .catch(err => {
      console.error(err);
    })
  }

  getInitialCards() {
    return fetch(`${this.baseURL}/v1/group-12/cards`, {
      headers: {
        authorization: "397bd50b-9f39-4bee-ad9c-11e69aa20ec4"
      }
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
    return fetch(`${this.baseURL}/v1/group-12/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "397bd50b-9f39-4bee-ad9c-11e69aa20ec4",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      this.#checkResponse(response);
    })
  }

  updateAvatar (data) {
    return fetch(`${this.baseURL}/v1/group-12/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "397bd50b-9f39-4bee-ad9c-11e69aa20ec4",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      this.#checkResponse(response);
    })
  }

  addCard(data) {
    return fetch(`${this.baseURL}/v1/group-12/cards`, {
      method: "POST",
      headers: {
        authorization: "397bd50b-9f39-4bee-ad9c-11e69aa20ec4",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      this.#checkResponse(response);
    });
  }

  removeCard(data) {
    return fetch(`${this.baseURL}/v1/group-12/cards/${data._id}`, {
      method: "DELETE",
      headers: {
        authorization: "397bd50b-9f39-4bee-ad9c-11e69aa20ec4",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      this.#checkResponse(response);
    })
  }

  addLike(data) {
    return fetch(`${this.baseURL}/v1/group-12/cards/likes/${data._id}`, {
      method: "PUT",
      headers: {
        authorization: "397bd50b-9f39-4bee-ad9c-11e69aa20ec4",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      this.#checkResponse(response);
    })
  }

  removeLike (data) {
    return fetch(`${this.baseURL}/v1/group-12/cards/likes/${data._id}`, {
      method: "DELETE",
      headers: {
        authorization: "397bd50b-9f39-4bee-ad9c-11e69aa20ec4",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      this.#checkResponse(response);
    })
  }
}
