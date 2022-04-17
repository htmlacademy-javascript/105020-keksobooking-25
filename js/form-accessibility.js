import {
  changeAttributes,
} from './util.js';

import {
  createSlider,
} from './form-slider.js';

import {
  validateForm,
} from './form-validation.js';


const
  adForm = document.querySelector('.ad-form'),
  mapFilters = document.querySelector('.map__filters');
const
  adFormFields = adForm.querySelectorAll('fieldset, .ad-form__slider'),
  mapFiltersFields = mapFilters.querySelectorAll('fieldset, select');

createSlider();

adForm.classList.add('ad-form--disabled');
mapFilters.classList.add('map__filters--disabled');
changeAttributes('add', ['disabled', ''], adFormFields, mapFiltersFields);

const enableFormAccessibility = () => {
  validateForm();
  adForm.classList.remove('ad-form--disabled');
  changeAttributes('del', ['disabled'], adFormFields);
};

const enableFormFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  changeAttributes('del', ['disabled'], mapFiltersFields);
};

export {
  enableFormAccessibility,
  enableFormFilters,
};
