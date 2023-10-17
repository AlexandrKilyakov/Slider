class SimpleGlide {
  static default = (function () {
    const nav = {
      buttons: true,
      radio: false,
    };

    const auto = {
      speed: 1000,
      timer: false,
    };

    return {
      buttons: nav.buttons,
      radio: nav.radio,
      speed: auto.speed,
      timer: auto.timer,
    };
  })();

  static elements = (function () {
    function _createElement(tag, cls) {
      const element = document.createElement(tag);
      element.className = cls;

      return element;
    }

    function createTrack(slider) {
      const slides = slider.querySelectorAll(".slide");
      const track = _createElement("div", "slider--window");

      let result = "";
      result = `<div class="slider--track">`;

      slides.forEach((slide) => {
        result += slide.outerHTML;
      });

      slides.forEach((slide) => {
        slide.remove();
      });
      result += `</div>`;

      track.innerHTML = result;

      slider.prepend(track);
    }

    function addButtons(slider) {
      const buttons = _createElement("div", "slider-nav");

      buttons.innerHTML = `<button class="slider--step" data-step="back"></button>
                          <button class="slider--step" data-step="next"></button>`;

      slider.appendChild(buttons);
    }

    return {
      createTrack,
      addButtons,
    };
  })();

  constructor(selector) {
    this.selectors = document.querySelectorAll(selector);

    SimpleGlide.createTrack(this.selectors);
  }

  static createTrack(sliders) {
    if (!sliders.length) {
      return false;
    }

    sliders.forEach((slider) => {
      SimpleGlide.elements.createTrack(slider);

      if (SimpleGlide.default.buttons) {
        SimpleGlide.addButtons(slider);
      }
    });
  }

  static addButtons(slider) {
    SimpleGlide.elements.addButtons(slider);
  }
}
