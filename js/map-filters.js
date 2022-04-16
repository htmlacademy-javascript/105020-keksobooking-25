const FiltersOptions = {
  PIN_MAX: 10,
  PRICE: {
    low: {max: 10000, text: 'low'},
    middle: {min: 10000, max: 50000, text: 'middle'},
    high: {max: 50000, text: 'high'},
  },
};

const priceRange = (value, offerPrice) => {
  const {PRICE} = FiltersOptions;
  switch (value) {
    case PRICE.low.text:
      return offerPrice < PRICE.low.max;
    case PRICE.middle.text:
      return offerPrice >= PRICE.middle.min && offerPrice < PRICE.middle.max;
    case PRICE.high.text:
      return offerPrice > PRICE.high.max;
  }
};

const checkEquality = (option, data) => {
  const result = Number(option) === Number(data);
  return result;
};

const checkFeatures = (option, data) => {
  // console.log(option.value);
  if (data === undefined) {
    return false;
  }
  return data.includes(option.value);
};

const applyFilter = (data, select, features) => {
  const option = document.querySelector(select);
  if (option.value === 'any' || option.checked === false) {
    return true;
  }
  if (features) {
    return checkFeatures(option, data.offer.features);
  }
  switch (select) {
    case '#housing-type':
      return option.value === data.offer.type;
    case '#housing-price':
      return priceRange(option.value, data.offer.price);
    case '#housing-rooms':
      return checkEquality(option.value, data.offer.rooms);
    case '#housing-guests':
      return checkEquality(option.value, data.offer.guests);
  }
};

const type = (data) => applyFilter(data, '#housing-type');
const price = (data) => applyFilter(data, '#housing-price');
const rooms = (data) => applyFilter(data, '#housing-rooms');
const guests = (data) => applyFilter(data, '#housing-guests');
const wifi = (data) => applyFilter(data, '#filter-wifi', 'features');
const dishwasher = (data) => applyFilter(data, '#filter-dishwasher', 'features');
const parking = (data) => applyFilter(data, '#filter-parking', 'features');
const washer = (data) => applyFilter(data, '#filter-washer', 'features');
const conditioner = (data) => applyFilter(data, '#filter-conditioner', 'features');

const mapFilters = (data) => {
  const {PIN_MAX} = FiltersOptions;
  const result = data
    .slice()
    .filter(type)
    .filter(price)
    .filter(rooms)
    .filter(guests)
    .filter(wifi)
    .filter(dishwasher)
    .filter(parking)
    .filter(washer)
    .filter(conditioner)
    .slice(0, PIN_MAX);
  return result;
};

export {
  mapFilters
};
