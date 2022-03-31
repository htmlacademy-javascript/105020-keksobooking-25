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

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}
pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const amountRoomsCapacity  = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей'],
};

adForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

export {
  enableFormAccessibility,
};
