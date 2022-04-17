import {
  showAlert,
} from './util.js';

const ServerOptions = {
  GET_URL: 'https://25.javascript.pages.academy/keksobooking/data',
  SEND_URL: 'https://25.javascript.pages.academy/keksobooking',
};

const getData = (onSuccess) => {
  fetch(ServerOptions.GET_URL)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => showAlert(error));
};

const sendData = (onSuccess, onFail, onEnd, body) => {
  fetch(
    ServerOptions.SEND_URL,
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
      onFail();
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
