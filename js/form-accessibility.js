import {
  changeAttributes,
} from './util.js';

import {
} from './nouislider.js';

const RoomSelector = {
  ONE: {num: '1', text: '1 комната', capacity: '«для 1 гостя»'},
  TWO: {num: '2', text: '2 комнаты', capacity: '«для 2 гостей» или «для 1 гостя»'},
  THREE: {num: '3', text: '3 комнаты', capacity: '«для 3 гостей», «для 2 гостей» или «для 1 гостя»'},
  HUNDRED: {num: '100', text: '100 комнат', capacity: '«не для гостей»'},
};

const
  adForm = document.querySelector('.ad-form'),
  mapFilters = document.querySelector('.map__filters');
const
  adFormFields = adForm.querySelectorAll('fieldset'),
  mapFiltersFields = mapFilters.querySelectorAll('fieldset, select');
adForm.classList.add('ad-form--disabled');
mapFilters.classList.add('map__filters--disabled');
changeAttributes('add', ['disabled', ''], adFormFields, mapFiltersFields);
// TODO Слайдер также должен быть Заблокирован;

const enableFormAccessibility = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  changeAttributes('del', ['disabled'], adFormFields, mapFiltersFields);
  // TODO Слайдер также должен быть Разблокирован;
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
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
const roomCapacity = adForm.querySelector('#capacity');
const roomOptions  = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

function validateRoom () {
  return roomOptions[roomNumber.value].includes(roomCapacity.value);
}

function getRoomNumberErrorMessage () {
  const {ONE, TWO, THREE, HUNDRED} = RoomSelector;
  switch (roomNumber.value) {
    case ONE.num:
      return ONE.text;
    case TWO.num:
      return TWO.text;
    case THREE.num:
      return THREE.text;
    case HUNDRED.num:
      return HUNDRED.text;
  }
}

function getRoomCapacityErrorMessage () {
  const {ONE, TWO, THREE, HUNDRED} = RoomSelector;
  switch (roomNumber.value) {
    case ONE.num:
      return ONE.capacity;
    case TWO.num:
      return TWO.capacity;
    case THREE.num:
      return THREE.capacity;
    case HUNDRED.num:
      return HUNDRED.capacity;
  }
}

pristine.addValidator(roomNumber, validateRoom, getRoomNumberErrorMessage);
pristine.addValidator(roomCapacity, validateRoom, getRoomCapacityErrorMessage);

function onRoomChange () {
  pristine.validate(roomNumber);
  pristine.validate(roomCapacity);
}

adForm
  .querySelectorAll('#room_number, #capacity')
  .forEach((item) => item.addEventListener('change', onRoomChange));

adForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
    pristine.validate();
  }
});

export {
  enableFormAccessibility,
};
