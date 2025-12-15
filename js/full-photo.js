import { getRandomNumber, isEscapeKey } from './utils.js';

const NUMBER_COMMENT = 5;

const photoContainer = document.querySelector('.pictures');

const fullPhotoSection = document.querySelector('.big-picture');

const fullPhotoContainer = fullPhotoSection.querySelector('.big-picture__img');
const fullPhoto = fullPhotoContainer.querySelector('img');

const fullPhotoSocialContainer = fullPhotoSection.querySelector('.big-picture__social');
const photoAuthor = fullPhotoSocialContainer.querySelector('img');
const photoDescription = fullPhotoSocialContainer.querySelector('.social__caption');
const photoSumLike = fullPhotoSocialContainer.querySelector('.likes-count');

const fullPhotoCommentContainer = fullPhotoSection.querySelector('.social__comment-count');
const showCommentNum = fullPhotoCommentContainer.querySelector('.social__comment-shown-count');
const sumComment = fullPhotoCommentContainer.querySelector('.social__comment-total-count');

const listComment = fullPhotoSection.querySelector('.social__comments');

const btnLoadComment = fullPhotoSection.querySelector('.comments-loader');
const btnClose = fullPhotoSection.querySelector('.big-picture__cancel');

let currentPhotosData = [];

let allComments = [];
let countComment = 0;

const openModal = () => {
  fullPhotoSection.classList.remove('hidden');
  document.body.classList.add('modal-open');

  btnClose.addEventListener('click', onBtnCloseClick);
  document.addEventListener('keydown', onEscKeydown);
};

const createFullPhoto = (url, description, likes) => {
  fullPhoto.src = url;
  fullPhoto.alt = description;

  photoAuthor.src = `img/avatar-${getRandomNumber(1, 6)}.svg`;
  photoDescription.textContent = description;
  photoSumLike.textContent = likes;
};

const clearComments = () => {
  listComment.innerHTML = '';
};

const renderCommentsPhoto = (comments, fragment) => {
  comments.forEach((comment) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;
    li.append(img);

    const text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = comment.message;
    li.append(text);

    fragment.append(li);
  });
  return fragment;
};

const showCommentsPhoto = () => {
  const fragment = document.createDocumentFragment();
  const startIndex = countComment;
  countComment += NUMBER_COMMENT;
  const endIndex = Math.min(countComment, allComments.length);
  btnLoadComment.classList.remove('hidden');

  if (countComment < allComments.length) {
    showCommentNum.textContent = countComment;
    sumComment.textContent = allComments.length;
    const currentComment = renderCommentsPhoto(allComments.slice(startIndex, endIndex), fragment);
    listComment.append(currentComment);
    btnLoadComment.addEventListener('click', onBtnLoadCommentClick);
  } else {
    countComment = allComments.length;
    showCommentNum.textContent = countComment;
    sumComment.textContent = allComments.length;
    btnLoadComment.classList.add('hidden');
    const currentComment = renderCommentsPhoto(allComments.slice(startIndex, endIndex), fragment);
    listComment.append(currentComment);
  }
};

const onPhotoContainerClick = (evt) => {
  const photo = evt.target.closest('.picture');

  if (photo) {
    evt.preventDefault();
    const src = photo.querySelector('.picture__img').getAttribute('src');
    const dataPhoto = currentPhotosData.find((item) => item.url === src);

    const { url, description, likes, comments } = dataPhoto;

    openModal();
    createFullPhoto(url, description, likes);
    clearComments();
    showCommentsPhoto(allComments = comments);
  }
};

const getCurrentData = (data) => {
  currentPhotosData = data;
};

photoContainer.addEventListener('click', onPhotoContainerClick);

const closeModelOpen = () => {
  fullPhotoSection.classList.add('hidden');
  document.body.classList.remove('modal-open');
  btnClose.removeEventListener('click', onBtnCloseClick);
  btnLoadComment.removeEventListener('click', onBtnLoadCommentClick);
  document.removeEventListener('keydown', onEscKeydown);
  countComment = 0;
};

function onBtnLoadCommentClick() {
  showCommentsPhoto();
}

function onBtnCloseClick () {
  closeModelOpen();
}

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModelOpen();
  }
}

export { getCurrentData };
