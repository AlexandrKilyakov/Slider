import { CreateElement } from "./createElement.js";

export class SliderElement extends CreateElement {
  static priority = ["frame", "buttons"];

  steps = [];

  constructor(fillter, slider, tag, cls) {
    super(tag, cls);
    this.fillter = fillter;
    this.slider = slider;

    this.createTrack();
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

    SliderElement.eventButtons(obj.element);

    obj.appendTo(obj.slider);
  }

  static eventButtons(btns) {
    btns.addEventListener("click", (event) => {
      const btn = event.closest("[data-step]");

      if (!btn) return;

      // Логика кнопок
    });
  }
  static getSteps(obj) {
    const slides = obj.slider.querySelectorAll(".slide");
    const sliderWindow = obj.slider.querySelector(".slider--window");
    let windowWidth = sliderWindow.offsetWidth;

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
          windowWidth = sliderWindow.offsetWidth + slide.offsetLeft;
          slideStep = i;
        }
      });
    }

    if (slides.length > 1) {
      const slidesLW =
        slides[slideStep].offsetLeft + slides[slideStep].offsetWidth;

      if (windowWidth - slidesLW < sliderWindow.offsetWidth) {
        let max = maxWidth - sliderWindow.offsetWidth;

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
}
