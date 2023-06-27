export default class UserInfo {
  #profileUsername;
  #profileAbout;
  #avatar;

  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this.#profileUsername = document.querySelector(nameSelector);
    this.#profileAbout = document.querySelector(aboutSelector);
    this.#avatar = document.querySelector(avatarSelector);
    this.userId = "";
  }

  setUserId({_id}) {
    this.userId = _id;
  }

  getUserInfo() {
    return {
      name: this.#profileUsername.textContent,
      about: this.#profileAbout.textContent
    }
  }

  setUserInfo({name, about, avatar}) {
    this.#profileUsername.textContent = name;
    this.#profileAbout.textContent = about;
    this.#avatar.src = avatar;
    this.#avatar.alt = name;
  }

  setAvatar({avatar}) {
    this.#avatar.src = avatar;
    this.#avatar.alt = this.#profileUsername;
  }
}
