import {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  putZeroBeforeNumber,
  copyMixArrayRandomSize,
  getArrayRandomInteger,
} from './util.js';

const
  NUMBER_OBJECTS = 10,
  OFFER_TIMES = ['12:00', '13:00', '14:00'],
  OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  OFFER_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'],
  OFFER_TITLES = ['Снять домик, который поможет Вам блеснуть в разговоре', 'Как побороть страх, и снять домик в свое удовольствие', 'Бросьте нести чушь! Мы изучили все о вашей Гостинице', 'Ван Дамм одобряет: как мы пробовали изменить Гостиницу', 'Быть или не быть: какая гостиница подойдет именно для вас', 'Что? Где? Почем? Изучаем Гостиницы', 'Гостиницы — ваш злейший враг', 'Один шанс из ста: как заслужить доверие у Гостиницы', 'Как я пробовал отдыхай в гостинице', 'Почему все любят, когда говорят о Гостинице', '13 возможностей Гостиницы, которые раньше многие недооценивали'],
  OFFER_DESCRIPTIONS = ['Соображения высшего порядка, а также новая модель организационной деятельности представляет собой интересный эксперимент проверки направлений прогрессивного развития. Задача организации, в...', 'Повседневная практика показывает, что реализация намеченного плана развития играет важную роль в формировании форм воздействия? Соображения высшего порядка, а также...', 'Не следует, однако, забывать о том, что консультация с профессионалами из IT обеспечивает актуальность системы масштабного изменения ряда параметров. С...', 'Не следует, однако, забывать о том, что дальнейшее развитие различных форм деятельности обеспечивает актуальность дальнейших направлений развития проекта. Не следует,...', 'Повседневная практика показывает, что сложившаяся структура организации требует определения и уточнения направлений прогрессивного развития! Практический опыт показывает, что рамки и...', 'Таким образом, реализация намеченного плана развития способствует повышению актуальности экономической целесообразности принимаемых решений! Повседневная практика показывает, что начало повседневной работы...', 'Задача организации, в особенности же сложившаяся структура организации играет важную роль в формировании существующих финансовых и административных условий. Практический опыт...', 'Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности обеспечивает актуальность направлений прогрессивного развития. Практический опыт показывает, что...', 'Дорогие друзья, реализация намеченного плана развития способствует подготовке и реализации системы масштабного изменения ряда параметров! Дорогие друзья, рамки и место...', 'С другой стороны сложившаяся структура организации позволяет выполнить важнейшие задания по разработке всесторонне сбалансированных нововведений. Соображения высшего порядка, а также...', 'Задача организации, в особенности же новая модель организационной деятельности способствует повышению актуальности системы обучения кадров, соответствующей насущным потребностям! Значимость этих...', 'Разнообразный и богатый опыт выбранный нами инновационный путь требует определения и уточнения соответствующих условий активизации. Практический опыт показывает, что дальнейшее...'],
  OFFER_PRICES = [8500, 35000],
  OFFER_LOCATIONS = {Lat: [35.65000, 35.70000], Lng: [139.70000, 139.80000], Digits: 5},
  OFFER_GUESTS = [1, 12],
  OFFER_ROOMS = [1, 5];

const createObjectLocation = () => {
  const location = new Object();
  location.lat = getRandomPositiveFloat(...OFFER_LOCATIONS.Lat, OFFER_LOCATIONS.Digits);
  location.lng = getRandomPositiveFloat(...OFFER_LOCATIONS.Lng, OFFER_LOCATIONS.Digits);
  return location;
};

const createObjectAuthors = () => {
  const arr = getArrayRandomInteger(NUMBER_OBJECTS);
  const getObject = () => {
    const number = arr.pop();
    const zeroNumber = putZeroBeforeNumber(number);
    const author = new Object();
    author.avatar = `img/avatars/user${zeroNumber}.png`;
    return author;
  };
  return Array.from({length: NUMBER_OBJECTS}, getObject);
};

const createObjectOffers = () => {
  const arrTitles = getArrayRandomInteger(NUMBER_OBJECTS);
  const arrDescriptions = getArrayRandomInteger(NUMBER_OBJECTS);
  const getObject = () => {
    const offer = new Object();
    const numberTitle = arrTitles.pop();
    const numberDescription = arrDescriptions.pop();
    const location = createObjectLocation();
    offer.title = OFFER_TITLES[numberTitle];
    offer.description = OFFER_DESCRIPTIONS[numberDescription];
    offer.price = getRandomPositiveInteger(...OFFER_PRICES);
    offer.type = OFFER_TYPES[getRandomPositiveInteger(0, OFFER_TYPES.length - 1)];
    offer.rooms = getRandomPositiveInteger(...OFFER_ROOMS);
    offer.guests = getRandomPositiveInteger(...OFFER_GUESTS);
    offer.checkin = OFFER_TIMES[getRandomPositiveInteger(0, OFFER_TIMES.length - 1)];
    offer.checkout = OFFER_TIMES[getRandomPositiveInteger(0, OFFER_TIMES.length - 1)];
    offer.features = copyMixArrayRandomSize(OFFER_FEATURES);
    offer.photos = copyMixArrayRandomSize(OFFER_PHOTOS);
    offer.address = `${location.lat}, ${location.lng}`;
    return offer;
  };
  return Array.from({length: NUMBER_OBJECTS}, getObject);
};

export {
  createObjectAuthors,
  createObjectOffers,
};
