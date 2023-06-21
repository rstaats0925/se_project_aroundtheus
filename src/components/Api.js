export default class Api {
  constructor(options) {
    this.options = options;
    this.baseURL = "https://around.nomoreparties.co";
  }

  getUserInfo () {
    return fetch(`${this.baseURL}/v1/group-12/users/me`, this.options)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(`Error: ${response.stats}`);
      }

      return response.json();
    })
    .catch(err => {
      console.error(err);
    })
  }

  getInitialCards() {}
}
