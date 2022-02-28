const NUMBER_BJECTS = 10;
const POSSIBLE_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

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

const getArrayRandomInteger = () => {
  const arr = [];
  const result = [];
  for (let i = NUMBER_BJECTS; i > 0; i--) {
    arr.unshift(i);
  }
  while (arr.length > 0) {
    const random = getRandomPositiveInteger(0, arr.length - 1);
    const elem = arr.splice(random, 1)[0];
    result.push(elem);
  }
  return result;
};

const createObjectAuthor = () => {
  const arr = getArrayRandomInteger();
  const getNumber = () => {
    const  result = arr.pop();
    return `img/avatars/user${putZeroBeforeNumber(result)}.png`;
  };
  const author = Array.from({length: NUMBER_BJECTS}, getNumber);
  return author;
};

{
  getRandomPositiveFloat(1.1, 6.1, 1);
  createObjectAuthor();
}
/*
TODO[  ] offer, объект — содержит информацию об объявлении. Состоит из полей:
  TODO[  ] title, строка — заголовок предложения. Придумайте самостоятельно.
  TODO[  ] address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.lat}}, {{location.lng}}.
  TODO[  ] price, число — стоимость. Случайное целое положительное число.
  TODO[  ] type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
    TODO[ X ] Создать массив.
  TODO[  ] rooms, число — количество комнат. Случайное целое положительное число.
  TODO[  ] guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
  TODO[  ] checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
  TODO[  ] checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
    TODO[ X ] Создать массив.
  TODO[  ] features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
    TODO[ X ] Создать массив.
  TODO[  ] description, строка — описание помещения. Придумайте самостоятельно.
  TODO[  ] photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.

  TODO[  ] location, объект — местоположение в виде географических координат. Состоит из двух полей:
    TODO[  ] lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
    TODO[  ] lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
*/
