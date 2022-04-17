const DEFAULT_VALUE_PRICE = 1000;

const sliderPrice = document.querySelector('.ad-form__slider');
const valuePrice = document.querySelector('#price');

const createSlider = () => {
  noUiSlider.create(sliderPrice, {
    range: {
      min: 0,
      max: Number(valuePrice.max),
    },
    start: DEFAULT_VALUE_PRICE,
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

  const setValuePrice = () => {
    sliderPrice.noUiSlider.set(valuePrice.value);
  };

  valuePrice.addEventListener('change', setValuePrice);
};

const sliderPriceUpdate = (callback) => {
  sliderPrice.noUiSlider.on('update', () => {
    valuePrice.value = sliderPrice.noUiSlider.get();
    callback();
  });
};

const resetSlider = () => {
  sliderPrice.noUiSlider.set(DEFAULT_VALUE_PRICE);
  valuePrice.value = '';
};

export {
  createSlider,
  sliderPriceUpdate,
  resetSlider,
};
