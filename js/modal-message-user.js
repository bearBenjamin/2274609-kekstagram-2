import { isEscapeKey } from './utils.js';
import { onModalEditingEscKeydown } from './form.js';

const ALERT__SHOW__TIME = 5000;

const alertTemplate = document.querySelector('#data-error').content;

const succesTemplate = document.querySelector('#success').content;
const newSucces = succesTemplate.querySelector('.success');

const showErrorTemplate = document.querySelector('#error').content;
const newShowErrorTemplate = showErrorTemplate.querySelector('.error');

const showAlert = () => {
  const alertFragment = alertTemplate.cloneNode(true);
  const alertElement = alertFragment.firstElementChild;

  document.body.append(alertFragment);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT__SHOW__TIME);
};

const hidenShowSucces = () => {
  const cloneShowSucces = document.querySelector('.success');
  cloneShowSucces.remove();
  clinearEventSuccess();
};

const onEventSuccessClick = (evt) => {
  const success = document.querySelector('.success__inner');
  const successMasege = document.querySelector('.success__title');

  if (evt.target === success || evt.target === successMasege) {
    evt.stopPropagation();
  } else {
    hidenShowSucces();
  }
};

const onEventSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    hidenShowSucces();
  }
};

function clinearEventSuccess () {
  document.removeEventListener('click', onEventSuccessClick);
  document.removeEventListener('keydown', onEventSuccessEscKeydown);
}

const showSucces = () => {
  const cloneSucces = newSucces.cloneNode(true);

  document.body.append(cloneSucces);

  document.addEventListener('click', onEventSuccessClick);
  document.addEventListener('keydown', onEventSuccessEscKeydown);
};

const hidenShowError = () => {
  const cloneShowError = document.querySelector('.error');
  cloneShowError.remove();
  clinearEventError();
};

const onEvenErrorClick = (evt) => {
  const error = document.querySelector('.error__inner');
  const errorMessage = document.querySelector('.error__title');

  if (evt.target === error || evt.target === errorMessage) {
    evt.stopPropagation();
  } else {
    hidenShowError();
  }
};

const onEvenErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    hidenShowError();
  }
};

function clinearEventError () {
  document.removeEventListener('click', onEvenErrorClick);
  document.removeEventListener('keydown', onEvenErrorEscKeydown);
  document.addEventListener('keydown', onModalEditingEscKeydown);
}

const showError = () => {
  const cloneShowError = newShowErrorTemplate.cloneNode(true);

  document.body.append(cloneShowError);

  document.addEventListener('click', onEvenErrorClick);
  document.addEventListener('keydown', onEvenErrorEscKeydown);
  document.removeEventListener('keydown', onModalEditingEscKeydown);
};

export { showAlert, showSucces, showError };
