import {
  enableFormAccessibility,
  enableFormFilters,
} from './form-accessibility.js';

import {
  getObjectCoordinates,
  getCityScale,
  resetMap,
  getStringCoordinates,
  debounce
} from './util.js';

import {
  adsGeneration,
} from './ads-generation.js';

import {
  getData,
} from './api.js';

import {
  mapFilters,
} from './map-filters.js';

import {
  resetDivPreview,
} from './form-image.js';

import {
  resetSlider,
} from './form-slider.js';

const PinOptions = {
  MAIN_PIN: {
    url: 'img/main-pin.svg',
    size: [52, 52],
    anchor: [26, 53],
  },
  PIN: {
    url: 'img/pin.svg',
    size: [40, 40],
    anchor: [20, 41],
  },
  COORDINATE_SIZE: 4,
};

const CURRENT_CITY = 'TOKYO';

const adForm = document.querySelector('.ad-form');
const address = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const arrayObjectDataMap = new Array();

const addMarkersMap = (data) => {
  mapFilters(data)
    .forEach((point) => {
      onMapCreateMarker(point);
    });
};

const map = L.map('map-canvas')
  .on('load', () => {
    enableFormAccessibility();
    getData((data) => {
      addMarkersMap(data);
      enableFormFilters();
      arrayObjectDataMap.push(...data);
    });
  })
  .setView(
    getObjectCoordinates(CURRENT_CITY),
    getCityScale(CURRENT_CITY));

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const
  mainPinIcon = L.icon({
    iconUrl: PinOptions.MAIN_PIN.url,
    iconSize: PinOptions.MAIN_PIN.size,
    iconAnchor: PinOptions.MAIN_PIN.anchor,
  }),
  pinIcon = L.icon({
    iconUrl: PinOptions.PIN.url,
    iconSize: PinOptions.PIN.size,
    iconAnchor: PinOptions.PIN.anchor,
  });

const mainPinMarker = L.marker(
  getObjectCoordinates(CURRENT_CITY),
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  address.value = `${coordinates.lat.toFixed(PinOptions.COORDINATE_SIZE)}, ${coordinates.lng.toFixed(PinOptions.COORDINATE_SIZE)}`;
});

address.value = getStringCoordinates(CURRENT_CITY);

const resetTokyoMap = () => {
  (function () {
    resetMap(mainPinMarker, map, CURRENT_CITY);
    setTimeout(() => {
      address.value = getStringCoordinates(CURRENT_CITY);
    }, 0);
  }());
};

resetButton.addEventListener('click', () => {
  adForm.reset();
  resetTokyoMap();
  resetDivPreview();
  resetSlider();
  clearAddMarkersMap();
});

const markerGroup = L.layerGroup().addTo(map);

function onMapCreateMarker (point) {
  const {lat, lng} = point.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: pinIcon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(adsGeneration(point));
}

function clearAddMarkersMap () {
  markerGroup.clearLayers();
  addMarkersMap(arrayObjectDataMap);
}

const formMapFilters = document.querySelector('.map__filters');
formMapFilters.addEventListener('change', debounce(clearAddMarkersMap));

export {
  resetTokyoMap,
  clearAddMarkersMap,
};
