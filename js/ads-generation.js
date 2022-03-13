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
} from './util.js';

const adsGeneration = () => {
  const getAuthors = createObjectAuthors();
  const getOffers = createObjectOffers();
  const offers = getOffers.map((item, index) => ({...item, ...getAuthors[index]}));

  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const mapCanvas = document.querySelector('#map-canvas');

  const cardFragment = document.createDocumentFragment();

  offers.forEach(({title, address, price, type, rooms, guests, checkin, checkout, features}) => {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = title;
    cardElement.querySelector('.popup__text--address').textContent = address;
    cardElement.querySelector('.popup__text--price').innerHTML = getOfferPriceTemplate(price);
    cardElement.querySelector('.popup__type').innerHTML = getOfferType(type);
    cardElement.querySelector('.popup__text--capacity').innerHTML = getOfferСapacity(rooms, guests);
    cardElement.querySelector('.popup__text--time').textContent = getOfferTime(checkin, checkout);
    //FIXME
    // cardElement.querySelector('.popup__features').append = getOfferFeatures(features);

    cardFragment.appendChild(cardElement);
  });

  mapCanvas.appendChild(cardFragment);

  // console.log(features);
};

export { adsGeneration };


/**

TODO В список .popup__features выведите все доступные удобства в объявлении.

TODO В блок .popup__description выведите описание объекта недвижимости offer.description.

TODO В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.

TODO Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.

TODO Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.

TODO  Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas, чтобы проверить, что данные в разметку были вставлены корректно.

**/
