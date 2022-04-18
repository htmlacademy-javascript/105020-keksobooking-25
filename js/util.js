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
    INNER_HTML: 'innerHTML',
    SRC: 'src',
    PHOTOS: 'photos',
    FEATURES: 'features',
    TWO_ELEM_INNER_HTML: 'twoElemInnerHTML',
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

const getOfferPriceTemplate = (price) => {
  const result = `${price} <span>₽/ночь</span>`;
  return result;
};

const getOfferType = (type) => {
  const result = housingTypes[type];
  return result;
};

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

const getDeclinationGuests = (guests) => {
  const result =  guests > 1 ? 'гостей' : 'гостя';
  return result;
};

const getOfferСapacity = (rooms, guests) => {
  let result;
  switch (true) {
    case (!rooms):
      result = `Для ${guests} ${getDeclinationGuests(guests)}`;
      return result;
    case (!guests):
      result = `${rooms} ${getDeclinationRooms(rooms)}`;
      return result;
    default:
      result = `${rooms} ${getDeclinationRooms(rooms)} для ${guests} ${getDeclinationGuests(guests)}`;
      return result;
  }
};

const getOfferTime = (checkin, checkout) => {
  let result;
  switch (true) {
    case (!checkin):
      result = `Выезд до ${checkout}`;
      return result;
    case (!checkout):
      result = `Заезд после ${checkin}`;
      return result;
    default:
      result = `Заезд после ${checkin}, выезд до ${checkout}`;
      return result;
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
  const {TEXT_CONTENT, TEXT_CONTENT_TASK, INNER_HTML, SRC, PHOTOS, FEATURES, TWO_ELEM_INNER_HTML, TWO_ELEM_TEXT_CONTENT} = OfferSelectorAction;
  let result;
  if (!elem) {
    result = selector.remove();
    return result;
  }
  switch (action) {
    case TEXT_CONTENT:
      result = selector.textContent = elem;
      return result;
    case TEXT_CONTENT_TASK:
      result = selector.textContent = task(elem);
      return result;
    case INNER_HTML:
      result = selector.innerHTML = task(elem);
      return result;
    case SRC:
      result = selector.src = elem;
      return result;
    case PHOTOS:
      result = task(selector, elem);
      return result;
    case FEATURES:
      result = task(selectAll, elem);
      return result;
    case TWO_ELEM_INNER_HTML:
      result = selector.innerHTML = task(...elem);
      return result;
    case TWO_ELEM_TEXT_CONTENT:
      result = selector.textContent = task(...elem);
      return result;
  }
};
const changeAttributes = (action, attribute, ...list) => {
  const {ADD, DEL} = AttributesAction;
  switch (action) {
    case ADD:
      for (let i = 0; i < list.length; i++){
        list[i].forEach((elem) => elem.setAttribute(attribute[0], attribute[1]));
      }
      break;
    case DEL:
      for (let i = 0; i < list.length; i++){
        list[i].forEach((elem) => elem.removeAttribute(attribute[0]));
      }
      break;
  }
};

const mapFormFields = (options, main, secondary) => {
  const result = options[main.value].includes(secondary.value);
  return result;
};

const getCoordinateObject = (city) => {
  const result = {lat: Cities[city].lat, lng: Cities[city].lng};
  return result;
};

const getStringCoordinates = (city) => {
  const coordinatesObject = getCoordinateObject(city);
  const result = `${coordinatesObject.lat}, ${coordinatesObject.lng}`;
  return result;
};

const getCityScale = (city) => Cities[city].scale;

const resetMap = (pin, mapL, city) => {
  pin.setLatLng(
    getCoordinateObject(city),
  );

  mapL.setView(
    getCoordinateObject(city),
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
  getOfferСapacity,
  getOfferTime,
  getOfferFeatures,
  getOfferPhotos,
  selectOffer,
  changeAttributes,
  mapFormFields,
  getCoordinateObject,
  showAlert,
  blockButton,
  getCityScale,
  resetMap,
  getStringCoordinates,
  checkIsEscapeKey,
  debounce,
};
