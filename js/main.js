import './ads-generation.js';
import './form-accessibility.js';

import {
  addMarkersMap,
  resetTokyoMap,
} from './map.js';

import {
  getData,
} from './api.js';

import {
  setUserFormSubmit,
} from './form-validation.js';

const MAX_POINT = 10;

getData((data) => {
  addMarkersMap(data.slice(0, MAX_POINT));
});

setUserFormSubmit(resetTokyoMap);
