export class CreateElement {
  constructor(tag, cls) {
    this.create(tag, cls);
  }

  create(tag, cls) {
    this.element = document.createElement(tag);
    this.element.className = cls;
  }

  insertHTML(html) {
    this.element.innerHTML = html;
  }

  appendTo(parent) {
    parent.appendChild(this.element);
  }

  appendToEnd(parent) {
    parent.prepend(this.element);
  }
}
