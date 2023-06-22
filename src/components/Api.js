export default class Api {
  constructor() {
    this.baseURL = "https://around.nomoreparties.co";
  }

  getUserInfo () {
    return fetch(`${this.baseURL}/v1/group-12/users/me`, {
      headers: {
        authorization: "397bd50b-9f39-4bee-ad9c-11e69aa20ec4"
      }
    })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(`Error: ${response.status}`);
      }

      return response.json();
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
      if (!response.ok) {
        return Promise.reject(`Error: ${response.status}`)
      }

      return response.json();
    })
    .catch(err => {
      console.error(err);
    })
  }

  getUserAndCardInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  updateProfileInfo() {
    fetch("https://around.nomoreparties.co/v1/groupId/users/me", {
      method: "PATCH",
      headers: {
        authorization: "397bd50b-9f39-4bee-ad9c-11e69aa20ec4",
        "Content-Type": "application/json"
      }
    })
  }
}
