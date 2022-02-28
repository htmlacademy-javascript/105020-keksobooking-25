const NUMBER_OBJECTS = 10;
const OFFER_TIME = ['12:00', '13:00', '14:00'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const OFFER_TITLE = ['Снять домик, который поможет Вам блеснуть в разговоре', 'Как побороть страх, и снять домик в свое удовольствие', 'Бросьте нести чушь! Мы изучили все о вашей Гостинице', 'Ван Дамм одобряет: как мы пробовали изменить Гостиницу', 'Быть или не быть: какая гостиница подойдет именно для вас', 'Что? Где? Почем? Изучаем Гостиницы', 'Гостиницы — ваш злейший враг', 'Один шанс из ста: как заслужить доверие у Гостиницы', 'Как я пробовал отдыхай в гостинице', 'Почему все любят, когда говорят о Гостинице', '13 возможностей Гостиницы, которые раньше многие недооценивали'];

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

const getArrayRandomInteger = (size = NUMBER_OBJECTS) => {
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

const createObjectAuthors = () => {
  const arr = getArrayRandomInteger();
  const getObject = () => {
    const number = arr.pop();
    const zeroNumber = putZeroBeforeNumber(number);
    const author = new Object();
    author.avatar = `img/avatars/user${zeroNumber}.png`;
    return author;
  };
  const authors = Array.from({length: NUMBER_OBJECTS}, getObject);
  return authors;
};

const createObjectOffers = () => {
  const arrTitle = getArrayRandomInteger();
  const getObject = () => {
    const offer = new Object();
    const numberTitle = arrTitle.pop();
    offer.title = OFFER_TITLE[numberTitle];
    offer.price = getRandomPositiveInteger(8500, 35000);
    offer.type = OFFER_TYPE[getRandomPositiveInteger(0, OFFER_TYPE.length - 1)];
    offer.rooms = getRandomPositiveInteger(1, 5);
    offer.guests = getRandomPositiveInteger(1, 12);
    offer.checkin = OFFER_TIME[getRandomPositiveInteger(0, OFFER_TIME.length - 1)];
    offer.checkout = OFFER_TIME[getRandomPositiveInteger(0, OFFER_TIME.length - 1)];
    return offer;
  };
  const offers = Array.from({length: NUMBER_OBJECTS}, getObject);
  return offers;
};


{
  getRandomPositiveFloat(1.1, 6.1, 1);
  createObjectAuthors();
  createObjectOffers();
}
console.log(createObjectAuthors());
console.log(createObjectOffers());

/*
TODO[  ] offer, объект — содержит информацию об объявлении. Состоит из полей:
  TODO[ X ] title, строка — заголовок предложения. Придумайте самостоятельно.
    TODO[ X ] Создать массив.
  TODO[  ] address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.lat}}, {{location.lng}}.
  TODO[ X ] price, число — стоимость. Случайное целое положительное число.
  TODO[ X ] type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
    TODO[ X ] Создать массив.
  TODO[ X ] rooms, число — количество комнат. Случайное целое положительное число.
  TODO[ X ] guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
  TODO[ X ] checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
    TODO[ X ] Создать массив.
  TODO[  ] features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
    TODO[ X ] Создать массив.
  TODO[  ] description, строка — описание помещения. Придумайте самостоятельно.
  TODO[  ] photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.

  TODO[  ] location, объект — местоположение в виде географических координат. Состоит из двух полей:
    TODO[  ] lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
    TODO[  ] lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
*/
