import {
  enableFormAccessibility,
} from './form-accessibility.js';

import {
  getCoordinateObject,
} from './util.js';

import {
  createObjectOffers,
} from './data.js';

import {
  adsGeneration,
} from './ads-generation.js';

const Tokyo = {
  LAT: 35.6895,
  LNG: 139.692,
  SCALE: 12,
};

const PinOptions = {
  MAIM_PIN: {
    url: '../img/main-pin.svg',
    size: [52, 52],
    anchor: [26, 53],
  },
  PIN: {
    url: '../img/pin.svg',
    size: [40, 40],
    anchor: [20, 41],
  },
};

const address = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

const map = L.map('map-canvas')
  .on('load', () => {
    enableFormAccessibility();
  })
  .setView(
    getCoordinateObject(Tokyo.LAT, Tokyo.LNG),
    Tokyo.SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const
  mainPinIcon = L.icon({
    iconUrl: PinOptions.MAIM_PIN.url,
    iconSize: PinOptions.MAIM_PIN.size,
    iconAnchor: PinOptions.MAIM_PIN.anchor,
  }),
  pinIcon = L.icon({
    iconUrl: PinOptions.PIN.url,
    iconSize: PinOptions.PIN.size,
    iconAnchor: PinOptions.PIN.anchor,
  });

const mainPinMarker = L.marker(
  getCoordinateObject(Tokyo.LAT, Tokyo.LNG),
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

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng(
    getCoordinateObject(Tokyo.LAT, Tokyo.LNG),
  );

  map.setView(
    getCoordinateObject(Tokyo.LAT, Tokyo.LNG),
    Tokyo.SCALE);
});

const points = createObjectOffers();

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
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
};

points.forEach((point) => {
  createMarker(point);
});