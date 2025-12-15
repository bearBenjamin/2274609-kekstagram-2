import { initFormSubmit, onFieldLoadChange } from './form.js';
import { getData } from './fetch.js';
import { showAlert } from './modal-message-user.js';
import { initFilterPhotos } from './filter.js';


const fieldLoadFileElement = document.querySelector('#upload-file');

fieldLoadFileElement.addEventListener('change', onFieldLoadChange);

getData()
  .then((dataPhotos) => {
    initFilterPhotos(dataPhotos);
  })
  .catch(() => {
    showAlert();
  });

initFormSubmit();
