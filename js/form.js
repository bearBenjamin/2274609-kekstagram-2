import { isEscapeKey } from './utils.js';
import { isHashtag, isDubleHashtags, isLengthHashtags, isCommentLength } from './valid-form.js';
import { showSucces, showError } from './modal-message-user.js';
import { initScale } from './scalle-photo.js';
import { initSlaider } from './slider-effects.js';
import { setData } from './fetch.js';

const FILE_TYPES = ['png', 'gif', 'jpeg', 'jpg'];

const formLoad = document.querySelector('#upload-select-image');

const fieldLoadFile = formLoad.querySelector('#upload-file');
const modalEditing = formLoad.querySelector('.img-upload__overlay');

const fieldHashtag = formLoad.querySelector('.text__hashtags');
const fieldDescription = formLoad.querySelector('.text__description');

const previewImage = document.querySelector('.img-upload__preview');
const effectPreviews = formLoad.querySelectorAll('.effects__preview');

const btnCloseForm = formLoad.querySelector('.img-upload__cancel');
const btnSubmitForm = document.querySelector('#upload-submit');

const pristine = new Pristine(formLoad, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(fieldHashtag, isHashtag, 'Неверный хэш-тег', 1, false);
pristine.addValidator(fieldHashtag, isDubleHashtags, 'Хэш-теги дублируются', 2, false);
pristine.addValidator(fieldHashtag, isLengthHashtags, 'Не более пяти хэш-тегов', 3, false);

pristine.addValidator(fieldDescription, isCommentLength, 'Не более 140 символов', false);

const showModalEditing = () => {
  modalEditing.classList.remove('hidden');
  document.body.classList.add('modal-open');
  initScale();
  initSlaider();
  document.addEventListener('keydown', onModalEditingEscKeydown);
};

const onFieldLoadChange = (evt) => {
  evt.preventDefault();
  const file = fieldLoadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewImage.children[0].src = URL.createObjectURL(file);

    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }

  showModalEditing();
};

const onBtnCloseClick = () => {
  formLoad.reset();
  pristine.reset();

  modalEditing.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEditingEscKeydown);
};

const blockBtnSubmit = () => {
  btnSubmitForm.disabled = true;
  btnSubmitForm.textContent = 'Публикую...';
};

const unBlockBtnSubmit = () => {
  btnSubmitForm.disabled = false;
  btnSubmitForm.textContent = 'Опубликовать';
};

const initFormSubmit = () => {
  formLoad.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockBtnSubmit();
      const formData = new FormData(evt.target);
      setData(formData)
        .then(() => {
          showSucces();
          onBtnCloseClick();
          unBlockBtnSubmit();
        })
        .catch(() => {
          showError();
          unBlockBtnSubmit();
        });
    }
  });
};

btnCloseForm.addEventListener('click', onBtnCloseClick);

function onModalEditingEscKeydown (evt) {
  if (fieldHashtag === document.activeElement || fieldDescription === document.activeElement) {
    return evt;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onBtnCloseClick();
  }
}

export { initFormSubmit, onModalEditingEscKeydown, onFieldLoadChange };
