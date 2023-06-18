//https://around.nomoreparties.co/vi/{group-id}

export default class Api {
  constructor(options) {
    this.options = options;
  }

  getUserInfo () {
    return fetch("https://around.nomoreparties.co/v1/groupId/users/me", {
      authorization: ""
    })
    .then(response => response.json())
  }

  getInitialCards() {

  }
}