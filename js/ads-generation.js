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

const adsGeneration = (serialNumber) => {
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
    const select = (elem) => cardElement.querySelector(elem);
    const selectAll = (elem) => cardElement.querySelectorAll(elem);
    offerSelector(select('.popup__title'), 'textContent', title);
    offerSelector(select('.popup__description'), 'textContent', description);
    offerSelector(select('.popup__text--address'), 'textContent', address);
    offerSelector(select('.popup__text--price'), 'innerHTML', price, getOfferPriceTemplate);
    offerSelector(select('.popup__type'), 'textContent', type, getOfferType);
    offerSelector(select('.popup__avatar'), 'src', avatar, getOfferType);
    offerSelector(select('.popup__photos'), 'photos', photos, getOfferPhotos);
    offerSelector(select('.popup__text--capacity'), ['twoElements', 'innerHTML'], [rooms, guests], getOfferСapacity);
    offerSelector(select('.popup__text--time'), ['twoElements', 'textContent'], [checkin, checkout], getOfferTime);
    offerSelector(select('.popup__features'), 'features', features, getOfferFeatures, selectAll('.popup__feature'));
    cardFragment.appendChild(cardElement);
  });
  if (serialNumber) {
    return mapCanvas.appendChild(cardFragment.children[serialNumber - 1]);
  }
  return mapCanvas.appendChild(cardFragment);
};

export { adsGeneration };
