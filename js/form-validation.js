import {
  mapFormfields,
  blockButton,
} from './util.js';

import {
  sliderPriceUpdate,
} from './form-slider.js';

import {
  sendData,
} from './api.js';

import {
  openSuccessModal,
  openErrorModal,
} from './modal.js';

const
  RoomSelector = {
    ONE: {num: '1', text: '1 комната', capacity: '«для 1 гостя»', array: ['1']},
    TWO: {num: '2', text: '2 комнаты', capacity: '«для 2 гостей» или «для 1 гостя»', array: ['2', '1']},
    THREE: {num: '3', text: '3 комнаты', capacity: '«для 3 гостей», «для 2 гостей» или «для 1 гостя»', array: ['3', '2', '1']},
    HUNDRED: {num: '100', text: '100 комнат', capacity: '«не для гостей»', array: ['0']},
  },
  HousingSelector = {
    BUNGALOW: {price: '0', type: 'Бунгало', value: 'bungalow', text: 'минимальная цена за ночь 0'},
    FLAT: {price: '1000', type: 'Квартира', value: 'flat', text: 'минимальная цена за ночь 1 000'},
    HOTEL: {price: '3000', type: 'Отель', value: 'hotel', text: 'минимальная цена за ночь 3 000'},
    HOUSE: {price: '5000', type: 'Дом', value: 'house', text: 'минимальная цена 5 000'},
    PALACE: {price: '10000', type: 'Дворец', value: 'palace', text: 'минимальная цена 10 000'},
  },
  titleOptions = {
    MIN: 30,
    MAX: 100,
    TEXT: 'От 30 до 100 символов',
  };

const roomOptions  = {
  1: RoomSelector.ONE.array,
  2: RoomSelector.TWO.array,
  3: RoomSelector.THREE.array,
  100: RoomSelector.HUNDRED.array,
};

const housingOptions = {
  bungalow: HousingSelector.BUNGALOW.price,
  flat: HousingSelector.FLAT.price,
  hotel: HousingSelector.HOTEL.price,
  house: HousingSelector.HOUSE.price,
  palace: HousingSelector.PALACE.price,
};

const
  adForm = document.querySelector('.ad-form'),
  submitButton = document.querySelector('.ad-form__submit');

const
  roomNumber = adForm.querySelector('#room_number'),
  roomCapacity = adForm.querySelector('#capacity'),
  timeIn = adForm.querySelector('#timein'),
  timeOut = adForm.querySelector('#timeout'),
  housingType = adForm.querySelector('#type'),
  housingPrice = adForm.querySelector('#price');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error-text',
});

const validateForm = () => {
  const validateTitle = (value) => {
    const result = value.length >= titleOptions.MIN && value.length <= titleOptions.MAX;
    return result;
  };

  pristine.addValidator(
    adForm.querySelector('#title'),
    validateTitle,
    titleOptions.TEXT,
  );

  function validateRoom () {
    return mapFormfields(roomOptions, roomNumber, roomCapacity);
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

  function validateHousing () {
    if (housingPrice.value === '') {
      return false;
    }
    return Number(housingOptions[housingType.value]) <= Number(housingPrice.value);
  }

  function getHousingTypeErrorMessage () {
    const {BUNGALOW, FLAT, HOTEL, HOUSE, PALACE} = HousingSelector;
    switch (housingType.value) {
      case BUNGALOW.value:
        return BUNGALOW.type;
      case FLAT.value:
        return FLAT.type;
      case HOTEL.value:
        return HOTEL.type;
      case HOUSE.value:
        return HOUSE.type;
      case PALACE.value:
        return PALACE.type;
    }
  }

  function getHousingPriceErrorMessage () {
    const {BUNGALOW, FLAT, HOTEL, HOUSE, PALACE} = HousingSelector;
    switch (housingType.value) {
      case BUNGALOW.value:
        return BUNGALOW.text;
      case FLAT.value:
        return FLAT.text;
      case HOTEL.value:
        return HOTEL.text;
      case HOUSE.value:
        return HOUSE.text;
      case PALACE.value:
        return PALACE.text;
    }
  }

  pristine.addValidator(housingType, validateHousing, getHousingTypeErrorMessage);
  pristine.addValidator(housingPrice, validateHousing, getHousingPriceErrorMessage);

  function onHousingChange () {
    housingPrice.placeholder = housingOptions[housingType.value];
    pristine.validate(housingType);
    pristine.validate(housingPrice);
  }

  adForm
    .querySelectorAll('#type, #price')
    .forEach((item) => item.addEventListener('change', onHousingChange));

  sliderPriceUpdate(onHousingChange);

  function onTimeInChange () {
    timeOut.value = timeIn.value;
  }
  function onTimeOutChange () {
    timeIn.value = timeOut.value;
  }

  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
};

const setUserFormSubmit = (resetMap) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
    const isValid = pristine.validate();
    if (isValid) {
      blockButton(submitButton, true, 'Отправка...');
      sendData(
        () => {
          evt.target.reset();
          resetMap();
          openSuccessModal();
        },
        () => {
          openErrorModal();
        },
        () => {
          blockButton(submitButton, false, 'Опубликовать');
        },
        new FormData(evt.target),
      );
    }
  });
};

export {
  validateForm,
  setUserFormSubmit,
};
