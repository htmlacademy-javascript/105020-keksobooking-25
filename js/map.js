import {
  enableFormAccessibility,
} from './form-accessibility.js';

const Tokyo = {
  LAT: 35.6895,
  LNG: 139.692,
};

const PinOptions = {
  MAIM_PIN: {
    url: '../img/main-pin.svg',
    size: [52, 52],
    anchor: [26, 53],
  },
};

const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    enableFormAccessibility();
  })
  .setView({
    lat: Tokyo.LAT,
    lng: Tokyo.LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: PinOptions.MAIM_PIN.url,
  iconSize: PinOptions.MAIM_PIN.size,
  iconAnchor: PinOptions.MAIM_PIN.anchor,
});

const mainPinMarker = L.marker(
  {
    lat: Tokyo.LAT,
    lng: Tokyo.LNG,
  },
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
