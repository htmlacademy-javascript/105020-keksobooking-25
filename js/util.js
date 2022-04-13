const NEGATIVE_NUM = -1;

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
  AttributesAaction = {
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

const getRandomPositiveFloat = (a, b, digits = 1) => {
  try {
    checkNumber(a, b);
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
  }
  const min = Math.min(Math.abs(a), Math.abs(b));
  const max = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (max - min) + min;
  return +result.toFixed(digits);
};

const putZeroBeforeNumber = (number) => {
  if (String(number).length === 1) {
    return `0${number}`;
  }
  return number.toString();
};

const copyMixArrayRandomSize = (arr) => {
  const arrayCopy = arr.slice();
  const arrayRandomSize = getRandomPositiveInteger(1, arrayCopy.length);
  const result = new Array();
  for (let i = 0; i  < arrayRandomSize; i++) {
    const random = getRandomPositiveInteger(0, arrayCopy.length - 1);
    const elem = arrayCopy.splice(random, 1)[0];
    result.push(elem);
  }
  return result;
};

const getArrayRandomInteger = (size) => {
  const arr = new Array();
  const result = new Array();
  for (let i = size; i > 0; i--) {
    arr.unshift(i);
  }
  while (arr.length > 0) {
    const random = getRandomPositiveInteger(0, arr.length - 1);
    const elem = arr.splice(random, 1)[0];
    result.push(elem);
  }
  return result;
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

const offerSelector = (selector, action, elem, task, selectAll) => {
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
  const {ADD, DEL} = AttributesAaction;
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

const mapFormfields = (options, main, secondary) => {
  const result = options[main.value].includes(secondary.value);
  return result;
};

const getCoordinateObject = (city) => {
  const result = {lat: Cities[city].lat, lng: Cities[city].lng};
  return result;
};

const getСitiesScale = (city) => {
  const result = Cities[city].scale;
  return result;
};

const resetMap = (pin, mapL, city) => {
  pin.setLatLng(
    getCoordinateObject(city),
  );

  mapL.setView(
    getCoordinateObject(city),
    getСitiesScale(city));
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';

  alertContainer.textContent = `😱 ${message}`;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const blockButton = (button, status, text) => {
  button.disabled = status;
  button.textContent = text;
};

export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  putZeroBeforeNumber,
  copyMixArrayRandomSize,
  getArrayRandomInteger,
  getOfferPriceTemplate,
  getOfferType,
  getOfferСapacity,
  getOfferTime,
  getOfferFeatures,
  getOfferPhotos,
  offerSelector,
  changeAttributes,
  mapFormfields,
  getCoordinateObject,
  showAlert,
  blockButton,
  getСitiesScale,
  resetMap,
};
