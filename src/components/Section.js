export default class Section {
  #items;
  #renderer;
  #container;

  constructor ({items, renderer}, containerSelector) {
    this.#items = items;//array of data for rendering cards onto page
    this.#renderer = renderer;//function responsible for creating and rendering data on a page
    this.#container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.#items.forEach(item => this.#renderer(item));
  }

  addItem(item) {
    this.#container.prepend(item);
  }
}
