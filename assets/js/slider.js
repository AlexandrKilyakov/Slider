class Slider {
  static default = (function () {
    const nav = {
      buttons: false,
      radio: false,
    };

    const auto = {
      speed: 1000,
      timer: false,
    };
  })();

  constructor(selector) {
    this.selector = document.querySelectorAll(selector);
  }
}
