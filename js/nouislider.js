const sliderPrice = document.querySelector('.ad-form__slider');
const valuePrice = document.querySelector('#price');

noUiSlider.create(sliderPrice, {
  range: {
    min: 0,
    max: 100,
  },
  start: valuePrice.value,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderPrice.noUiSlider.on('update', () => {
  valuePrice.value = sliderPrice.noUiSlider.get();
});

// export {
//   noUiSlider,
// };
