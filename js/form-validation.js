import {
  mapFormFields,
  blockButton,
} from './util.js';

import {
  refreshSliderPrice,
  resetSlider,
} from './form-slider.js';

import {
  sendData,
} from './api.js';

import {
  clearAddMarkersMap,
} from './map.js';

import {
  openSuccessModal,
  openErrorModal,
} from './modal.js';

import {
  checkImage,
  resetDivPreview,
} from './form-image.js';

const
  RoomSelector = {
    ONE: {num: '1', text: '1 комната', capacity: '«для 1 гостя»', option: ['1']},
    TWO: {num: '2', text: '2 комнаты', capacity: '«для 2 гостей» или «для 1 гостя»', option: ['2', '1']},
    THREE: {num: '3', text: '3 комнаты', capacity: '«для 3 гостей», «для 2 гостей» или «для 1 гостя»', option: ['3', '2', '1']},
    HUNDRED: {num: '100', text: '100 комнат', capacity: '«не для гостей»', option: ['0']},
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
  1: RoomSelector.ONE.option,
  2: RoomSelector.TWO.option,
  3: RoomSelector.THREE.option,
  100: RoomSelector.HUNDRED.option,
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
  const validateTitle = (value) => value.length >= titleOptions.MIN && value.length <= titleOptions.MAX;

  pristine.addValidator(
    adForm.querySelector('#title'),
    validateTitle,
    titleOptions.TEXT,
  );

  const validateRoom = () => mapFormFields(roomOptions, roomNumber, roomCapacity);

  const getRoomNumberErrorMessage = () => {
    switch (roomNumber.value) {
      case RoomSelector.ONE.num:
        return RoomSelector.ONE.text;
      case RoomSelector.TWO.num:
        return RoomSelector.TWO.text;
      case RoomSelector.THREE.num:
        return RoomSelector.THREE.text;
      case RoomSelector.HUNDRED.num:
        return RoomSelector.HUNDRED.text;
    }
  };

  const getRoomCapacityErrorMessage = () => {
    switch (roomNumber.value) {
      case RoomSelector.ONE.num:
        return RoomSelector.ONE.capacity;
      case RoomSelector.TWO.num:
        return RoomSelector.TWO.capacity;
      case RoomSelector.THREE.num:
        return RoomSelector.THREE.capacity;
      case RoomSelector.HUNDRED.num:
        return RoomSelector.HUNDRED.capacity;
    }
  };

  pristine.addValidator(roomNumber, validateRoom, getRoomNumberErrorMessage);
  pristine.addValidator(roomCapacity, validateRoom, getRoomCapacityErrorMessage);

  const onRoomChange = () => {
    pristine.validate(roomNumber);
    pristine.validate(roomCapacity);
  };

  adForm
    .querySelectorAll('#room_number, #capacity')
    .forEach((item) => item.addEventListener('change', onRoomChange));

  const validateHousing = () => {
    if (housingPrice.value === '') {
      return false;
    }
    return Number(housingOptions[housingType.value]) <= Number(housingPrice.value);
  };

  const getHousingTypeErrorMessage = () => {
    switch (housingType.value) {
      case HousingSelector.BUNGALOW.value:
        return HousingSelector.BUNGALOW.type;
      case HousingSelector.FLAT.value:
        return HousingSelector.FLAT.type;
      case HousingSelector.HOTEL.value:
        return HousingSelector.HOTEL.type;
      case HousingSelector.HOUSE.value:
        return HousingSelector.HOUSE.type;
      case HousingSelector.PALACE.value:
        return HousingSelector.PALACE.type;
    }
  };

  const getHousingPriceErrorMessage = () => {
    switch (housingType.value) {
      case HousingSelector.BUNGALOW.value:
        return HousingSelector.BUNGALOW.text;
      case HousingSelector.FLAT.value:
        return HousingSelector.FLAT.text;
      case HousingSelector.HOTEL.value:
        return HousingSelector.HOTEL.text;
      case HousingSelector.HOUSE.value:
        return HousingSelector.HOUSE.text;
      case HousingSelector.PALACE.value:
        return HousingSelector.PALACE.text;
    }
  };

  pristine.addValidator(housingType, validateHousing, getHousingTypeErrorMessage);
  pristine.addValidator(housingPrice, validateHousing, getHousingPriceErrorMessage);

  const onHousingChange = () => {
    housingPrice.placeholder = housingOptions[housingType.value];
    pristine.validate(housingType);
    pristine.validate(housingPrice);
  };

  adForm
    .querySelectorAll('#type, #price')
    .forEach((item) => item.addEventListener('change', onHousingChange));

  refreshSliderPrice(onHousingChange);

  const onTimeInChange = () => {
    timeOut.value = timeIn.value;
  };

  const onTimeOutChange = () => {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);

  checkImage('#avatar', '.ad-form-header__preview');
  checkImage('#images', '.ad-form__photo');
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
          clearAddMarkersMap();
          resetDivPreview();
          resetSlider();
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
