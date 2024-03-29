const FiltersOptions = {
  PIN_MAX: 10,
  PRICE: {
    low: {max: 10000, text: 'low'},
    middle: {min: 10000, max: 50000, text: 'middle'},
    high: {max: 50000, text: 'high'},
  },
  ALL_ELEMENTS: 'any'
};

const checkPriceRange = (value, offerPrice) => {
  switch (value) {
    case FiltersOptions.PRICE.low.text:
      return offerPrice < FiltersOptions.PRICE.low.max;
    case FiltersOptions.PRICE.middle.text:
      return offerPrice >= FiltersOptions.PRICE.middle.min && offerPrice < FiltersOptions.PRICE.middle.max;
    case FiltersOptions.PRICE.high.text:
      return offerPrice > FiltersOptions.PRICE.high.max;
  }
};

const checkEquality = (option, data) => Number(option) === Number(data);

const checkFeatures = (option, data) => {
  if (data === undefined) {
    return false;
  }
  return data.includes(option.value);
};

const applyFilter = (data, select, features) => {
  const option = document.querySelector(select);
  if (option.value === FiltersOptions.ALL_ELEMENTS || option.checked === false) {
    return true;
  }
  if (features) {
    return checkFeatures(option, data.offer.features);
  }
  switch (select) {
    case '#housing-type':
      return option.value === data.offer.type;
    case '#housing-price':
      return checkPriceRange(option.value, data.offer.price);
    case '#housing-rooms':
      return checkEquality(option.value, data.offer.rooms);
    case '#housing-guests':
      return checkEquality(option.value, data.offer.guests);
  }
};

const checkType = (data) => applyFilter(data, '#housing-type');
const checkPrice = (data) => applyFilter(data, '#housing-price');
const checkRooms = (data) => applyFilter(data, '#housing-rooms');
const checkGuests = (data) => applyFilter(data, '#housing-guests');
const checkWifi = (data) => applyFilter(data, '#filter-wifi', 'features');
const checkDishwasher = (data) => applyFilter(data, '#filter-dishwasher', 'features');
const checkParking = (data) => applyFilter(data, '#filter-parking', 'features');
const checkWasher = (data) => applyFilter(data, '#filter-washer', 'features');
const checkConditioner = (data) => applyFilter(data, '#filter-conditioner', 'features');

const mapFilters = (data) => {
  const result = data
    .slice()
    .filter(checkType)
    .filter(checkPrice)
    .filter(checkRooms)
    .filter(checkGuests)
    .filter(checkWifi)
    .filter(checkDishwasher)
    .filter(checkParking)
    .filter(checkWasher)
    .filter(checkConditioner)
    .slice(0, FiltersOptions.PIN_MAX);
  return result;
};

export {
  mapFilters
};
