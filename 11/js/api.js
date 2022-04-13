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

const sendData = (onSuccess, onFail, onEnd, body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch((error) => {
      showAlert(error, 'yellow', 'bottom');
    })
    .finally(() => {
      onEnd();
    });
};

export {
  getData,
  sendData,
};
