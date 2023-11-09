import { SliderElement } from "./core/dom/sliderElement.js";
import { options } from "./defaults.js";

export class SimpleGlide {
  constructor(selector, defaultOptions = {}) {
    this.selectors = document.querySelectorAll(selector);

    if (!this.selectors.length) return false;

    const fillter = { ...defaultOptions, ...options };

    SimpleGlide.createSlider(this.selectors, fillter);
  }

  static createSlider(sliders, fillter) {
    sliders.forEach((slider) => {
      const element = new SliderElement(
        fillter,
        slider,
        "div",
        "slider--window"
      );
      element.addSliderСomponents();
    });
  }
}
