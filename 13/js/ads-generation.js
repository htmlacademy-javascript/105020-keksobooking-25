import {
  getOfferPriceTemplate,
  getOfferType,
  getOfferСapacity,
  getOfferTime,
  getOfferFeatures,
  getOfferPhotos,
  offerSelector,
} from './util.js';

const adsGeneration = (point) => {
  const offer = point.offer;
  const avatar = point.author.avatar;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
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
  return cardElement;
};

export { adsGeneration };
