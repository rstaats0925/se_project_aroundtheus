export default class UserInfo {
  #profileUsername;
  #profileJob;

  constructor({nameSelector, jobSelector}) {
    this.#profileUsername = document.querySelector(nameSelector);
    this.#profileJob = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this.#profileUsername.textContent,
      job: this.#profileJob.textContent
    }
  }

  setUserInfo({name, job}) {
    this.#profileUsername.textContent = name;
    this.#profileJob.textContent = job;
  }
}
