import {
  enableFormAccessibility,
  enableFiltersccessibility,
} from './form-accessibility.js';

import {
  getCoordinateObject,
  getСitiesScale,
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
};

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
      enableFiltersccessibility();
      arrayObjectDataMap.push(...data);
    });
  })
  .setView(
    getCoordinateObject('TOKYO'),
    getСitiesScale('TOKYO'));

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
  getCoordinateObject('TOKYO'),
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  address.value = `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`;
});

address.value = getStringCoordinates('TOKYO');

const resetTokyoMap = () => {
  (function () {
    resetMap(mainPinMarker, map, 'TOKYO');
    setTimeout(() => {
      address.value = getStringCoordinates('TOKYO');
    }, 0);
  }());
};

resetButton.addEventListener('click', () => {
  resetTokyoMap();
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

const clearAddMarkersMap = () => {
  markerGroup.clearLayers();
  addMarkersMap(arrayObjectDataMap);
};

const housingType = document.querySelector('#housing-type');
housingType.addEventListener('change', debounce(clearAddMarkersMap));

const housingPrice = document.querySelector('#housing-price');
housingPrice.addEventListener('change', debounce(clearAddMarkersMap));

const housingRooms = document.querySelector('#housing-rooms');
housingRooms.addEventListener('change', debounce(clearAddMarkersMap));

const housingGuests = document.querySelector('#housing-guests');
housingGuests.addEventListener('change', debounce(clearAddMarkersMap));

const housingFeatures = document.querySelector('#housing-features');
const featuresInputs = housingFeatures.querySelectorAll('input[name=features]');
featuresInputs.forEach((elem) => {
  elem.addEventListener('change', debounce(clearAddMarkersMap));
});

export {
  resetTokyoMap,
};
