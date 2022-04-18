import {
  checkIsEscapeKey,
} from './util.js';

const
  successTemplate = document.querySelector('#success').content.querySelector('.success'),
  errorTemplate = document.querySelector('#error').content.querySelector('.error');

const
  successElement = successTemplate.cloneNode(true),
  errorElement = errorTemplate.cloneNode(true);

// success
const deleteModalSuccessElement = () => {
  document.body.removeChild(successElement);
  onSuccessModalClose();
};

const onSuccessEscKeydown = (evt) => {
  if (checkIsEscapeKey(evt)) {
    deleteModalSuccessElement();
  }
};

const openSuccessModal = () => {
  document.body.appendChild(successElement);
  document.addEventListener('keydown', onSuccessEscKeydown);
  successElement.addEventListener('click', deleteModalSuccessElement);
};

function onSuccessModalClose () {
  document.removeEventListener('keydown', onSuccessEscKeydown);
  successElement.removeEventListener('click', deleteModalSuccessElement);
}

// error
const deleteModalErrorElement = () => {
  document.body.removeChild(errorElement);
  onErrorModalClose();
};

const onErrorEscKeydown = (evt) => {
  if (checkIsEscapeKey(evt)) {
    deleteModalErrorElement();
  }
};

const openErrorModal = () => {
  document.body.appendChild(errorElement);
  document.addEventListener('keydown', onErrorEscKeydown);
  errorElement.addEventListener('click', deleteModalErrorElement);
};

function onErrorModalClose () {
  document.removeEventListener('keydown', onErrorEscKeydown);
  errorElement.removeEventListener('click', deleteModalErrorElement);
}

export {
  openSuccessModal,
  openErrorModal,
};
