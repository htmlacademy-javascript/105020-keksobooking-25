const NEGATIVE_NUM = -1;
const RERENDER_DELAY = 500;

const
  DeclinationRooms = {
    MORE_FIVE: 5,
    MORE_TWO: 2,
  },
  OfferSelectorAction = {
    TEXT_CONTENT: 'textContent',
    TEXT_CONTENT_TASK: 'textContentTask',
    SRC: 'src',
    PHOTOS: 'photos',
    FEATURES: 'features',
    TWO_ELEM_TEXT_CONTENT: 'twoElemTextContent',
  },
  AttributesAction = {
    ADD: 'add',
    DEL: 'del'
  };

const housingTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const Cities = {
  TOKYO: {
    lat: 35.6895,
    lng: 139.692,
    scale: 12,
  },
};

const ALERT_SHOW_TIME = 10000;

const formMapFilters = document.querySelector('.map__filters');

const checkNumber = (a, b) => {
  if (Math.sign(a) === NEGATIVE_NUM || Math.sign(b) === NEGATIVE_NUM) {
    throw new Error('Negative number is not allowed');
  }
};

const getRandomPositiveInteger = (a, b) => {
  try {
    checkNumber(a, b);
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
  }
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

const getOfferPriceTemplate = (price) => `${price} ₽/ночь`;

const getOfferType = (type) => housingTypes[type];

const getDeclinationRooms = (rooms) => {
  switch (true) {
    case (rooms >= DeclinationRooms.MORE_FIVE):
      return 'комнат';
    case (rooms >= DeclinationRooms.MORE_TWO):
      return 'комнаты';
    default:
      return 'комната';
  }
};

const getDeclinationGuests = (guests) => guests > 1 ? 'гостей' : 'гостя';

const getOfferCapacity = (rooms, guests) => {
  switch (true) {
    case (!rooms):
      return `Для ${guests} ${getDeclinationGuests(guests)}`;
    case (!guests):
      return  `${rooms} ${getDeclinationRooms(rooms)}`;
    default:
      return `${rooms} ${getDeclinationRooms(rooms)} для ${guests} ${getDeclinationGuests(guests)}`;
  }
};

const getOfferTime = (checkin, checkout) => {
  switch (true) {
    case (!checkin):
      return `Выезд до ${checkout}`;
    case (!checkout):
      return `Заезд после ${checkin}`;
    default:
      return `Заезд после ${checkin}, выезд до ${checkout}`;
  }
};

const getOfferFeatures = (list, features) => {
  const modifiers = features.map((feature) => `${list[0].classList[0]}--${feature}`);
  list.forEach((listItem) => {
    const modifier = listItem.classList[1];
    if (!modifiers.includes(modifier)) {
      listItem.remove();
    }
  });
};

const getOfferPhotos = (container, photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const template = container.children[0].cloneNode(true);
    template.src = photo;
    fragment.append(template);
  });
  container.children[0].remove();
  container.append(fragment);
};

const selectOffer = (selector, action, elem, task, selectAll) => {
  if (!elem) {
    return selector.remove();
  }
  switch (action) {
    case OfferSelectorAction.TEXT_CONTENT:
      selector.textContent = elem;
      return selector.textContent;
    case OfferSelectorAction.TEXT_CONTENT_TASK:
      selector.textContent = task(elem);
      return selector.textContent;
    case OfferSelectorAction.SRC:
      selector.src = elem;
      return selector.src;
    case OfferSelectorAction.PHOTOS:
      return task(selector, elem);
    case OfferSelectorAction.FEATURES:
      return task(selectAll, elem);
    case OfferSelectorAction.TWO_ELEM_TEXT_CONTENT:
      selector.textContent = task(...elem);
      return selector.textContent;
  }
};

const changeAttributes = (action, attribute, ...list) => {
  switch (action) {
    case AttributesAction.ADD:
      for (let i = 0; i < list.length; i++){
        list[i].forEach((elem) => elem.setAttribute(attribute[0], attribute[1]));
      }
      break;
    case AttributesAction.DEL:
      for (let i = 0; i < list.length; i++){
        list[i].forEach((elem) => elem.removeAttribute(attribute[0]));
      }
      break;
  }
};

const mapFormFields = (options, main, secondary) => options[main.value].includes(secondary.value);

const getObjectCoordinates = (city) => {
  const result = {lat: Cities[city].lat, lng: Cities[city].lng};
  return result;
};

const getStringCoordinates = (city) => {
  const coordinatesObject = getObjectCoordinates(city);
  return `${coordinatesObject.lat}, ${coordinatesObject.lng}`;
};

const getCityScale = (city) => Cities[city].scale;

const resetMap = (pin, mapL, city) => {
  pin.setLatLng(
    getObjectCoordinates(city),
  );

  mapL.setView(
    getObjectCoordinates(city),
    getCityScale(city));

  formMapFilters.reset();
};

const showAlert = (message, bgColor = 'red', place = 'top') => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style[place] = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = bgColor;
  alertContainer.style.color = 'white';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const blockButton = (button, status, text) => {
  button.disabled = status;
  button.textContent = text;
};

const checkIsEscapeKey = (evt) => evt.key === 'Escape';

function debounce (callback, timeoutDelay = RERENDER_DELAY) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  getRandomPositiveInteger,
  getOfferPriceTemplate,
  getOfferType,
  getOfferCapacity,
  getOfferTime,
  getOfferFeatures,
  getOfferPhotos,
  selectOffer,
  changeAttributes,
  mapFormFields,
  getObjectCoordinates,
  showAlert,
  blockButton,
  getCityScale,
  resetMap,
  getStringCoordinates,
  checkIsEscapeKey,
  debounce,
};
