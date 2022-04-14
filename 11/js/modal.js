import {
  isEscapeKey,
} from './util.js';

const
  successTemplate = document.querySelector('#success').content.querySelector('.success'),
  errorTemplate = document.querySelector('#error').content.querySelector('.error');

const
  successElement = successTemplate.cloneNode(true),
  errorElement = errorTemplate.cloneNode(true);

// success
const modalRemoveSuccessElement = () => {
  document.body.removeChild(successElement);
  closeSuccessModal();
};

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    modalRemoveSuccessElement();
  }
};

const openSuccessModal = () => {
  document.body.appendChild(successElement);
  document.addEventListener('keydown', onSuccessEscKeydown);
  successElement.addEventListener('click', modalRemoveSuccessElement);
};

function closeSuccessModal () {
  document.removeEventListener('keydown', onSuccessEscKeydown);
  successElement.removeEventListener('click', modalRemoveSuccessElement);
}

// error
const modalRemoveErrorElement = () => {
  document.body.removeChild(errorElement);
  closeErrorModal();
};

const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    modalRemoveErrorElement();
  }
};

const openErrorModal = () => {
  document.body.appendChild(errorElement);
  document.addEventListener('keydown', onErrorEscKeydown);
  errorElement.addEventListener('click', modalRemoveErrorElement);
};

function closeErrorModal () {
  document.removeEventListener('keydown', onErrorEscKeydown);
  errorElement.removeEventListener('click', modalRemoveErrorElement);
}

export {
  openSuccessModal,
  openErrorModal,
};
