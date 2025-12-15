import { renderPreview } from './preview-photo.js';
import { getCurrentData } from './full-photo.js';
import { debounce } from './utils.js';

const TIME_DELAY = 500;

const pictureContainer = document.querySelector('.pictures.container');

const filterContainer = document.querySelector('.img-filters');
const filterBtns = filterContainer.querySelectorAll('.img-filters__button');

const cleanBtn = (btns) => {
  btns.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
};

const cleanPictureContainer = () => {
  const pictures = pictureContainer.querySelectorAll('.picture');

  pictures.forEach((picture) => {
    picture.remove();
  });
};

const showPhotos = (dataPhotos) => {
  cleanPictureContainer();
  renderPreview(dataPhotos);
  getCurrentData(dataPhotos);
};

const showPhotosDebounce = debounce((data, time) => showPhotos(data, time));

const getRandomPhoto = (dataPhotos) => {
  const results = [];
  const totalCount = 10;
  const dataPhotosLength = dataPhotos.length;

  while (results.length < totalCount) {
    const randomIndex = Math.floor(Math.random() * dataPhotosLength);

    const randomElement = dataPhotos[randomIndex];

    if (!results.includes(randomElement)) {
      results.push(randomElement);
    }
  }

  return results;
};

const sortMessageAmount = (dataPhotos) => {
  const array = [...dataPhotos];
  const messageAmountSort = (messageA, messageB) => messageB.comments.length - messageA.comments.length;
  const sortArray = array.sort(messageAmountSort);
  return sortArray;
};

const initFilterPhotos = (dataPhotos) => {
  showPhotos(dataPhotos);
  filterContainer.classList.remove('img-filters--inactive');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('img-filters__button--active')) {
        return;
      }

      cleanBtn(filterBtns);
      btn.classList.add('img-filters__button--active');

      switch(btn.id) {
        case ('filter-default'):
          showPhotosDebounce(dataPhotos, TIME_DELAY);
          break;

        case ('filter-random'): {
          const newDataPhotos = getRandomPhoto(dataPhotos);
          showPhotosDebounce(newDataPhotos, TIME_DELAY);
          break;
        }

        case ('filter-discussed'): {
          const newDataPhotos = sortMessageAmount(dataPhotos);
          showPhotosDebounce(newDataPhotos, TIME_DELAY);
          break;
        }
      }
    });
  });
};


export { initFilterPhotos };
