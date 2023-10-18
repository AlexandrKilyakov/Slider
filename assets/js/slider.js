class SimpleGlide {
  static default = (function () {
    /*
      Шаги - по кадрам, по окну видимости
      Центрирование слайдера - центр, право, лево
      Навигация - стрелки, радио, мини картинки, свайп
      Листать по таймеру - видимость таймера, время ожидания, 
                          запускать таймер если слайдер
                          в зоне видимости и не наведен курсор

    */
    const nav = {
      buttons: true,
      radio: false,
    };

    const auto = {
      speed: 0,
      timer: false,
    };

    return {
      buttons: nav.buttons,
      radio: nav.radio,
      speed: auto.speed,
      timer: auto.timer,
    };
  })();

  static sliderСomponents = {
    buttons: (slider) => {
      SimpleGlide.addButtons(slider);
    },
    // radio: (slider) => {
    //   SimpleGlide.addRadio(slider);
    // },
    // speed: (slider) => {
    //   SimpleGlide.addButtons(slider);
    // },
    // timer: (slider) => {
    //   SimpleGlide.addButtons(slider);
    // },
  };

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

  constructor(selector, defaultFillter = false) {
    this.selectors = document.querySelectorAll(selector);
    const fillter =
      typeof defaultFillter == "object" ? defaultFillter : SimpleGlide.default;

    if (!this.selectors.length) {
      return false;
    }

    SimpleGlide.createTrack(this.selectors, fillter);
  }

  static createTrack(sliders, fillter) {
    sliders.forEach((slider) => {
      SimpleGlide.elements.createTrack(slider);
      SimpleGlide.addSliderСomponents(slider, fillter);
    });
  }

  static addSliderСomponents(slider, fillter) {
    for (let key in fillter) {
      if (SimpleGlide.sliderСomponents.hasOwnProperty(key)) {
        if (fillter[key]) {
          SimpleGlide.sliderСomponents[key](slider);
        }
      }
    }
  }

  static addButtons(slider) {
    SimpleGlide.elements.addButtons(slider);
  }
}
