import {
  showAlert,
} from './util.js';

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => showAlert(error));
};

const sendData = (onSuccess, body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobookin',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        showAlert('Не удалось отправить форму');
        //TODO
      }
    })
    .catch((error) => showAlert(error));
};

export {
  getData,
  sendData,
};
