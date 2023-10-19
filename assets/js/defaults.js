export const options = (function () {
  // Шаги - по кадрам, по окну видимости
  const step = {
    frame: false,
  };

  // Центрирование элементов - top, right, bottom, left, center
  const positions = {
    auto: {
      timer: "bottom",
    },
    nav: {
      buttons: "center",
      radio: "bottom",
    },
    step: {
      frame: "left",
    },
  };

  // Навигация - кнопки, радио, мини картинки, свайп
  const nav = {
    buttons: true,
    radio: false,
    preview: false,
    swipe: false,
  };

  /*
      
                          запускать таймер если слайдер
                          в зоне видимости и не наведен курсор
    */
  //  Листать по таймеру - видимость таймера, время ожидания
  const auto = {
    speed: 0,
    timer: false,
  };

  return {
    buttons: nav.buttons,
    radio: nav.radio,
    speed: auto.speed,
    timer: auto.timer,
    frame: step.frame,
    posTimer: positions.auto.timer,
    posButtons: positions.nav.buttons,
    posRadio: positions.nav.radio,
    posFrame: positions.step.frame,
  };
})();
