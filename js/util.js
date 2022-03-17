const DECLINATION_ROOMS = {
  MoreFive: 5,
  MoreTwo: 2,
};

const OFFER_SELECTOR_ACTION = {
  TextContent: 'textContent',
  TextContentTask: 'textContentTask',
  InnerHtml: 'innerHTML',
  Src: 'src',
  Photos: 'photos',
  Features: 'features',
  TwoElemInnerHtml: 'twoElemInnerHTML',
  TwoElemTextContent: 'twoElemTextContent',
};

const checkNumber = (a, b) => {
  if (Math.sign(a) === -1 || Math.sign(b) === -1) {
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
  switch (type.toString()) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
  }
};

const getDeclinationRooms = (rooms) => {
  switch (true) {
    case (rooms >= DECLINATION_ROOMS.MoreFive):
      return 'комнат';
    case (rooms >= DECLINATION_ROOMS.MoreTwo):
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
  const {TextContent, TextContentTask, InnerHtml, Src, Photos, Features, TwoElemInnerHtml, TwoElemTextContent} = OFFER_SELECTOR_ACTION;
  let result;
  if (!elem) {
    result = selector.remove();
    return result;
  }
  switch (action) {
    case TextContent:
      result = selector.textContent = elem;
      return result;
    case TextContentTask:
      result = selector.textContent = task(elem);
      return result;
    case InnerHtml:
      result = selector.innerHTML = task(elem);
      return result;
    case Src:
      result = selector.src = elem;
      return result;
    case Photos:
      result = task(selector, elem);
      return result;
    case Features:
      result = task(selectAll, elem);
      return result;
    case TwoElemInnerHtml:
      result = selector.innerHTML = task(...elem);
      return result;
    case TwoElemTextContent:
      result = selector.textContent = task(...elem);
      return result;
  }
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
};
