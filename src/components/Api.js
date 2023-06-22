export default class Api {
  constructor(options) {
    this.options = options;
    this.baseURL = "https://around.nomoreparties.co";
  }

  getUserInfo () {
    return fetch(`${this.baseURL}/v1/group-12/users/me`, this.options)
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
    return fetch(`${this.baseURL}/v1/group-12/cards`, this.options)
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
}
