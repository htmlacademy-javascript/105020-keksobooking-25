import {
  createObjectAuthors,
  createObjectOffers,
} from './data.js';

import {
  getOfferPriceTemplate,
  getOfferType,
} from './util.js';

const adsGeneration = () => {
  const getAuthors = createObjectAuthors();
  const getOffers = createObjectOffers();
  const offers = getOffers.map((item, index) => ({...item, ...getAuthors[index]}));

  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const mapCanvas = document.querySelector('#map-canvas');

  const cardFragment = document.createDocumentFragment();

  offers.forEach(({title, address, price, type}) => {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = title;
    cardElement.querySelector('.popup__text--address').textContent = address;
    cardElement.querySelector('.popup__text--price').innerHTML = getOfferPriceTemplate(price);
    cardElement.querySelector('.popup__type').innerHTML = getOfferType(type);
    cardFragment.appendChild(cardElement);
  });

  mapCanvas.appendChild(cardFragment);

  // console.log(offers);
};

export { adsGeneration };


/**
TODO Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
TODO  заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
TODO В список .popup__features выведите все доступные удобства в объявлении.
TODO В блок .popup__description выведите описание объекта недвижимости offer.description.
TODO В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
TODO Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.
TODO Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.

TODO  Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas, чтобы проверить, что данные в разметку были вставлены корректно.

**/
