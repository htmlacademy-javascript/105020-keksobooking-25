import {
  createObjectAuthors,
  createObjectOffers,
} from './data.js';

import {
  getOfferPriceTemplate,
  getOfferType,
  getOfferСapacity,
  getOfferTime,
  getOfferFeatures,
  getOfferPhotos,
  offerSelector,
} from './util.js';

const adsGeneration = () => {
  const getAuthors = createObjectAuthors();
  const getOffers = createObjectOffers();
  const offers = getOffers.map((item, index) => ({...item, ...getAuthors[index]}));

  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const mapCanvas = document.querySelector('#map-canvas');

  const cardFragment = document.createDocumentFragment();

  offers.forEach(({
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos,
    avatar,
  }) => {
    const cardElement = cardTemplate.cloneNode(true);
    // type='';
    offerSelector(cardElement.querySelector('.popup__title'), 'textContent', title);
    offerSelector(cardElement.querySelector('.popup__description'), 'textContent', description);
    offerSelector(cardElement.querySelector('.popup__text--address'), 'textContent', address);
    offerSelector(cardElement.querySelector('.popup__text--price'), 'innerHTML', price, getOfferPriceTemplate);
    offerSelector(cardElement.querySelector('.popup__type'), 'innerHTML', type, getOfferType);

    cardElement.querySelector('.popup__avatar').src = avatar;

    cardElement.querySelector('.popup__text--capacity').innerHTML = getOfferСapacity(rooms, guests);
    cardElement.querySelector('.popup__text--time').textContent = getOfferTime(checkin, checkout);

    getOfferFeatures(cardElement.querySelectorAll('.popup__feature'), features);
    getOfferPhotos(cardElement.querySelector('.popup__photos'), photos);

    cardFragment.appendChild(cardElement);
  });

  mapCanvas.appendChild(cardFragment);

  // console.log(features);
};

export { adsGeneration };


/**
TODO Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.

TODO  Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas, чтобы проверить, что данные в разметку были вставлены корректно.

**/
