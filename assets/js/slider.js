import { SliderElement } from "./core/dom/sliderElement.js";
import { options } from "./defaults.js";

export class SimpleGlide {
  constructor(selector, defaultOptions = false) {
    this.selectors = document.querySelectorAll(selector);
    const fillter =
      typeof defaultOptions == "object" ? defaultOptions : options;

    if (!this.selectors.length) {
      return false;
    }

    SimpleGlide.createSlider(this.selectors, fillter);
  }

  static createSlider(sliders, fillter) {
    sliders.forEach((slider) => {
      const element = new SliderElement(slider, "div", "slider--window");
      element.addSliderСomponents(fillter);
    });
  }
}
