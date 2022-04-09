import {
  changeAttributes,
} from './util.js';

import {
  createSlider,
} from './form-slider.js';

import {
  formValidation,
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
  formValidation();
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  changeAttributes('del', ['disabled'], adFormFields, mapFiltersFields);
};

export {
  enableFormAccessibility,
};
