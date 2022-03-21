import {
  addDdisabled,
} from './util.js';

const pageStatus = (status) => {
  const
    adForm = document.querySelector('.ad-form'),
    mapFilters = document.querySelector('.map__filters');
  const
    adFormFields = adForm.querySelectorAll('fieldset'),
    mapFiltersFields = mapFilters.querySelectorAll('fieldset, select');
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  addDdisabled(adFormFields, mapFiltersFields);
  // TODO Слайдер также должен быть заблокирован;
  // if (status) {
  //   const ok = 'ok';
  //   return ok;
  // }
  // console.log(mapFiltersFields);
};

export {
  pageStatus,
};
