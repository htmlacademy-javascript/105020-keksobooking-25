import {
  getOfferPriceTemplate,
  getOfferType,
  getOfferСapacity,
  getOfferTime,
  getOfferFeatures,
  getOfferPhotos,
  selectOffer,
} from './util.js';

const adsGeneration = (point) => {
  const offer = point.offer;
  const avatar = point.author.avatar;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);
  const select = (elem) => cardElement.querySelector(elem);
  const selectAll = (elem) => cardElement.querySelectorAll(elem);
  selectOffer(select('.popup__title'), 'textContent', title);
  selectOffer(select('.popup__description'), 'textContent', description);
  selectOffer(select('.popup__text--address'), 'textContent', address);
  selectOffer(select('.popup__text--price'), 'innerHTML', price, getOfferPriceTemplate);
  selectOffer(select('.popup__type'), 'textContentTask', type, getOfferType);
  selectOffer(select('.popup__avatar'), 'src', avatar);
  selectOffer(select('.popup__photos'), 'photos', photos, getOfferPhotos);
  selectOffer(select('.popup__text--capacity'), 'twoElemInnerHTML', [rooms, guests], getOfferСapacity);
  selectOffer(select('.popup__text--time'), 'twoElemTextContent', [checkin, checkout], getOfferTime);
  selectOffer(select('.popup__features'), 'features', features, getOfferFeatures, selectAll('.popup__feature'));
  return cardElement;
};

export {
  adsGeneration,
};
