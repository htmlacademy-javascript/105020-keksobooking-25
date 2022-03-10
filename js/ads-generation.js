import {
  createObjectAuthors,
  createObjectOffers,
} from './data.js';

const authors = createObjectAuthors();
const offers = createObjectOffers();
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const cardElement = cardTemplate.cloneNode(true);

const adsGeneration = () => {

};

console.log(mapCanvas);

export { adsGeneration };


/**
TODO Выведите заголовок объявления offer.title в заголовок .popup__title.
TODO Выведите адрес offer.address в блок .popup__text--address.
TODO Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
TODO В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:

Квартира для flat
Бунгало для bungalow
Дом для house
Дворец для palace
Отель для hotel

TODO Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
TODO  заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
TODO В список .popup__features выведите все доступные удобства в объявлении.
TODO В блок .popup__description выведите описание объекта недвижимости offer.description.
TODO В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
TODO Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.
TODO Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.

TODO  Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas, чтобы проверить, что данные в разметку были вставлены корректно.

**/
