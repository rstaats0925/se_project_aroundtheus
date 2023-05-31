class Section {
  #items;
  #renderer;
  #cardSelector;

  constructor ({items, renderer}, cardSelector) {
    this.#items = items;//array of data for rendering cards onto page
    this.#renderer = renderer;//function responsible for creating and rendering data on a page
    this.#cardSelector = cardSelector;
  }

  renderItems() {
    //renders all elements onto the page
    this.#items.forEach(this.#renderer);
  }

  addItem() {
    //takes a DOM element & adds it to the page
  }
}
