export default class UserInfo {
  #profileUsername;
  #profileJob;
  #avatar;

  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this.#profileUsername = document.querySelector(nameSelector);
    this.#profileJob = document.querySelector(aboutSelector);
    this.#avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this.#profileUsername.textContent,
      job: this.#profileJob.textContent
    }
  }

  setUserInfo({name, about, avatar}) {
    this.#profileUsername.textContent = name;
    this.#profileJob.textContent = about;
    this.#avatar.src = avatar;
    this.#avatar.alt = name;
  }
}
