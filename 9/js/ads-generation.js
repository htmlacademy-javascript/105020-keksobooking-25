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
  const rawAuthors = createObjectAuthors();
  const rawOffers = createObjectOffers();
  const offers = rawOffers.map((item, index) => ({...item, ...rawAuthors[index]}));
  const offer = offers[serialNumber - 1];
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos, avatar} = offer;
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const mapCanvas = document.querySelector('#map-canvas');
  const cardFragment = document.createDocumentFragment();
  const cardElement = cardTemplate.cloneNode(true);
  const select = (elem) => cardElement.querySelector(elem);
  const selectAll = (elem) => cardElement.querySelectorAll(elem);
  offerSelector(select('.popup__title'), 'textContent', title);
  offerSelector(select('.popup__description'), 'textContent', description);
  offerSelector(select('.popup__text--address'), 'textContent', address);
  offerSelector(select('.popup__text--price'), 'innerHTML', price, getOfferPriceTemplate);
  offerSelector(select('.popup__type'), 'textContentTask', type, getOfferType);
  offerSelector(select('.popup__avatar'), 'src', avatar);
  offerSelector(select('.popup__photos'), 'photos', photos, getOfferPhotos);
  offerSelector(select('.popup__text--capacity'), 'twoElemInnerHTML', [rooms, guests], getOfferСapacity);
  offerSelector(select('.popup__text--time'), 'twoElemTextContent', [checkin, checkout], getOfferTime);
  offerSelector(select('.popup__features'), 'features', features, getOfferFeatures, selectAll('.popup__feature'));
  cardFragment.appendChild(cardElement);
  return mapCanvas.appendChild(cardFragment);
};

export { adsGeneration };
