import { CreateElement } from "./createElement.js";

export class SliderElement extends CreateElement {
  static priority = ["frame", "buttons"];

  steps = [];

  constructor(fillter, slider, tag, cls) {
    super(tag, cls);
    this.fillter = fillter;
    this.slider = slider;

    this.createTrack();

    this.window = slider.querySelector(".slider--window");
    this.track = slider.querySelector(".slider--track");
    this.window.dataset.step = "0";
    SliderElement.takeStep(this);
  }

  static sliderСomponents = {
    buttons: (obj) => {
      SliderElement.addButtons(obj);
    },
    frame: (obj) => {
      SliderElement.getSteps(obj);
    },
  };

  createTrack() {
    const slides = this.slider.querySelectorAll(".slide");

    let result = `<div class="slider--track">`;

    slides.forEach((slide) => {
      result += slide.outerHTML;
    });

    slides.forEach((slide) => {
      slide.remove();
    });

    result += `</div>`;

    this.insertHTML(result);
    this.appendToEnd(this.slider);
  }

  addSliderСomponents() {
    for (let key of SliderElement.priority) {
      if (SliderElement.sliderСomponents.hasOwnProperty(key)) {
        SliderElement.sliderСomponents[key](this);
      }
    }
    // for (let key in fillter) {
    //   if (SliderElement.sliderСomponents.hasOwnProperty(key)) {
    //     if (fillter[key]) {
    //       SliderElement.sliderСomponents[key](this);
    //     }
    //   }
    // }
  }

  static addButtons(obj) {
    obj.create("div", "slider-nav");

    obj.insertHTML(`<button class="slider--step" data-step="back"></button>
                      <button class="slider--step" data-step="next"></button>`);

    SliderElement.eventButtons(obj.element, obj);

    obj.appendTo(obj.slider);
  }

  static eventButtons(btns, obj) {
    btns.addEventListener("click", ({ target }) => {
      const btn = target.closest("[data-step]");

      if (!btn) return;

      switch (btn.dataset.step) {
        case "next":
          SliderElement.takeStep(obj, 1);
          break;
        case "back":
          SliderElement.takeStep(obj, -1);
          break;
      }
    });
  }
  static getSteps(obj) {
    const slides = obj.slider.querySelectorAll(".slide");
    let windowWidth = obj.window.offsetWidth;

    const slidesLength = slides.length - 1;
    let slideStep = 0;
    let maxWidth =
      slides[slidesLength].offsetWidth + slides[slidesLength].offsetLeft;

    if (obj.fillter.frame) {
      slides.forEach((slide) => {
        obj.steps.push(slide.offsetLeft);
      });
    } else if (slides.length > 1) {
      obj.steps.push(0);

      slides.forEach((slide, i) => {
        if (slide.offsetLeft + slide.offsetWidth > windowWidth) {
          obj.steps.push(slide.offsetLeft);
          windowWidth = obj.window.offsetWidth + slide.offsetLeft;
          slideStep = i;
        }
      });
    }

    if (slides.length > 1) {
      const slidesLW =
        slides[slideStep].offsetLeft + slides[slideStep].offsetWidth;

      if (windowWidth - slidesLW < obj.window.offsetWidth) {
        let max = maxWidth - obj.window.offsetWidth;

        for (let i = obj.steps.length - 1; i >= 0; i--) {
          if (obj.steps[i] > max) {
            obj.steps[i] = max;
          }
        }

        obj.steps = obj.steps.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
      }
    }
  }

  static takeStep(obj, route = 0) {
    let max = obj.steps.length - 1;
    let step = Number(obj.window.dataset.step) + route;

    if (max < 0) {
      max = 0;
    }

    if (obj.fillter.finish) {
      if (step > max) {
        step = max;
      } else if (step < 0) {
        step = 0;
      }
    } else {
      if (step > max) {
        step = 0;
      } else if (step < 0) {
        step = max;
      }
    }

    obj.window.dataset.step = step;
    obj.track.style.translate = `-${obj.steps[step]}px 0`;
  }
}
