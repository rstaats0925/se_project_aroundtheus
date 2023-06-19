export default class UserInfo {
  #profileUsername;
  #profileAbout;
  #avatar;

  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this.#profileUsername = document.querySelector(nameSelector);
    this.#profileAbout = document.querySelector(aboutSelector);
    this.#avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this.#profileUsername.textContent,
      job: this.#profileAbout.textContent
    }
  }

  setUserInfo({name, about, avatar}) {
    this.#profileUsername.textContent = name;
    this.#profileAbout.textContent = about;
    this.#avatar.src = avatar;
    this.#avatar.alt = name;
  }
}
