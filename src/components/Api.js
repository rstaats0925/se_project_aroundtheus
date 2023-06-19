export default class Api {
  constructor(options) {
    this.options = options;
  }

  getUserInfo () {
    return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      headers: {
        authorization: "397bd50b-9f39-4bee-ad9c-11e69aa20ec4"
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Error: ${response.status}`);
    })
    .then(json => {
      callback(json);
    })
    .catch(err => {
      console.error(err);
    })
  }

  getInitialCards() {}
}
