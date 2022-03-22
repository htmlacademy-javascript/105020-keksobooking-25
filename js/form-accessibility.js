import {
  changeAttributes,
} from './util.js';

const
  adForm = document.querySelector('.ad-form'),
  mapFilters = document.querySelector('.map__filters');
const
  adFormFields = adForm.querySelectorAll('fieldset'),
  mapFiltersFields = mapFilters.querySelectorAll('fieldset, select');
adForm.classList.add('ad-form--disabled');
mapFilters.classList.add('map__filters--disabled');
changeAttributes('add', ['disabled', ''], adFormFields, mapFiltersFields);
// TODO Слайдер также должен быть заблокирован;
const enableFormAccessibility = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  changeAttributes('del', ['disabled'], adFormFields, mapFiltersFields);
};

export {
  enableFormAccessibility,
};
