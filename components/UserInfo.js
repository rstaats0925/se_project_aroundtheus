export default class UserInfo {
  #nameInput;
  #jobInput;
  #profileUsername;
  #profileJob;

  constructor({name, job}) {
    this.#nameInput = document.querySelector(name);
    this.#jobInput = document.querySelector(job);
    this.#profileUsername = document.querySelector(".profile__user-name");
    this.#profileJob = document.querySelector(".profile__job");
  }

  getUserInfo() {
    const userInformation = {
      name: this.#nameInput.value,
      job: this.#jobInput.value
    };

    return userInformation;
  }

  setUserInfo() {
    const formData = this.getUserInfo();
    this.#profileUsername.textContent = formData.name;
    this.#profileJob.textContent = formData.job;
  }
}