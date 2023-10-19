import { CreateElement } from "./createElement.js";

export class SliderElement extends CreateElement {
  constructor(slider, tag, cls) {
    super(tag, cls);
    this.slider = slider;

    this.createTrack();
  }

  static sliderСomponents = {
    buttons: (obj) => {
      SliderElement.addButtons(obj);
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

  addSliderСomponents(fillter) {
    for (let key in fillter) {
      if (SliderElement.sliderСomponents.hasOwnProperty(key)) {
        if (fillter[key]) {
          SliderElement.sliderСomponents[key](this);
        }
      }
    }
  }

  static addButtons(obj) {
    obj.create("div", "slider-nav");

    obj.insertHTML(`<button class="slider--step" data-step="back"></button>
                      <button class="slider--step" data-step="next"></button>`);

    obj.appendTo(obj.slider);
  }
}
