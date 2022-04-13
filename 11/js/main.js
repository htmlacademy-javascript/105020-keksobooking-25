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

getData(addMarkersMap);
setUserFormSubmit(resetTokyoMap);
