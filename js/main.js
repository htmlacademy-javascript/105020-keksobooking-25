const NUMBER_OBJECTS = 10;
const OFFER_TIME = ['12:00', '13:00', '14:00'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const OFFER_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const OFFER_TITLE = ['Снять домик, который поможет Вам блеснуть в разговоре', 'Как побороть страх, и снять домик в свое удовольствие', 'Бросьте нести чушь! Мы изучили все о вашей Гостинице', 'Ван Дамм одобряет: как мы пробовали изменить Гостиницу', 'Быть или не быть: какая гостиница подойдет именно для вас', 'Что? Где? Почем? Изучаем Гостиницы', 'Гостиницы — ваш злейший враг', 'Один шанс из ста: как заслужить доверие у Гостиницы', 'Как я пробовал отдыхай в гостинице', 'Почему все любят, когда говорят о Гостинице', '13 возможностей Гостиницы, которые раньше многие недооценивали'];
const OFFER_DESCRIPTION = ['Соображения высшего порядка, а также новая модель организационной деятельности представляет собой интересный эксперимент проверки направлений прогрессивного развития. Задача организации, в...', 'Повседневная практика показывает, что реализация намеченного плана развития играет важную роль в формировании форм воздействия? Соображения высшего порядка, а также...', 'Не следует, однако, забывать о том, что консультация с профессионалами из IT обеспечивает актуальность системы масштабного изменения ряда параметров. С...', 'Не следует, однако, забывать о том, что дальнейшее развитие различных форм деятельности обеспечивает актуальность дальнейших направлений развития проекта. Не следует,...', 'Повседневная практика показывает, что сложившаяся структура организации требует определения и уточнения направлений прогрессивного развития! Практический опыт показывает, что рамки и...', 'Таким образом, реализация намеченного плана развития способствует повышению актуальности экономической целесообразности принимаемых решений! Повседневная практика показывает, что начало повседневной работы...', 'Задача организации, в особенности же сложившаяся структура организации играет важную роль в формировании существующих финансовых и административных условий. Практический опыт...', 'Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности обеспечивает актуальность направлений прогрессивного развития. Практический опыт показывает, что...', 'Дорогие друзья, реализация намеченного плана развития способствует подготовке и реализации системы масштабного изменения ряда параметров! Дорогие друзья, рамки и место...', 'С другой стороны сложившаяся структура организации позволяет выполнить важнейшие задания по разработке всесторонне сбалансированных нововведений. Соображения высшего порядка, а также...', 'Задача организации, в особенности же новая модель организационной деятельности способствует повышению актуальности системы обучения кадров, соответствующей насущным потребностям! Значимость этих...', 'Разнообразный и богатый опыт выбранный нами инновационный путь требует определения и уточнения соответствующих условий активизации. Практический опыт показывает, что дальнейшее...'];

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

const createObjectLocation = () => {
  const location = new Object();
  location.lat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  location.lng = getRandomPositiveFloat(139.70000, 139.80000, 5);
  return location;
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
  const arrDescription = getArrayRandomInteger();
  const getObject = () => {
    const offer = new Object();
    const numberTitle = arrTitle.pop();
    const numberDescription = arrDescription.pop();
    const location = createObjectLocation();
    offer.title = OFFER_TITLE[numberTitle];
    offer.description = OFFER_DESCRIPTION[numberDescription];
    offer.price = getRandomPositiveInteger(8500, 35000);
    offer.type = OFFER_TYPE[getRandomPositiveInteger(0, OFFER_TYPE.length - 1)];
    offer.rooms = getRandomPositiveInteger(1, 5);
    offer.guests = getRandomPositiveInteger(1, 12);
    offer.checkin = OFFER_TIME[getRandomPositiveInteger(0, OFFER_TIME.length - 1)];
    offer.checkout = OFFER_TIME[getRandomPositiveInteger(0, OFFER_TIME.length - 1)];
    offer.features = copyMixArrayRandomSize(OFFER_FEATURES);
    offer.photos = copyMixArrayRandomSize(OFFER_PHOTOS);
    offer.address = `${location.lat}, ${location.lng}`;
    return offer;
  };
  const offers = Array.from({length: NUMBER_OBJECTS}, getObject);
  return offers;
};

createObjectAuthors();
createObjectOffers();
