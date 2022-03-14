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
  type.toString();
  if (type === 'flat') {
    return 'Квартира';
  }
  if (type === 'bungalow') {
    return 'Бунгало';
  }
  if (type === 'house') {
    return 'Дом';
  }
  if (type === 'palace') {
    return 'Дворец';
  }
  if (type === 'hotel') {
    return 'Отель';
  }
};

const declinationRooms = (rooms) => {
  if (rooms >= 5) {
    return 'комнат';
  }
  if (rooms >= 2) {
    return 'комнаты';
  }
  return 'комната';
};

const declinationGuests = (guests) => {
  if (guests > 1) {
    return 'гостей';
  }
  return 'гостя';
};

const getOfferСapacity = (rooms, guests) => {
  const result = `${rooms} ${declinationRooms(rooms)} для ${guests} ${declinationGuests(guests)}`;
  return result;
};

const getOfferTime = (checkin, checkout) => {
  const result = `Заезд после ${checkin}, выезд до ${checkout}`;
  return result;
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

const offerSelector = (selector, action, elem, task) => {
  if (!elem) {
    return selector.remove();
  }
  if (action === 'textContent') {
    const result = selector.textContent = elem;
    return result;
  }
  if (action === 'innerHTML') {
    const result = selector.innerHTML = task(elem);
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
