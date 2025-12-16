const HASHTAG_VALID_REG = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_LENGTH = 5;

const isEmptyStr = (value) => !value || value.trim() === '';

const normalizeHashtag = (value) => {
  const hashtags = value.split(' ').filter((item) => item.trim() !== '');
  return hashtags;
};

const isHashtag = (value) => {
  if (isEmptyStr(value)) {
    return true;
  }

  const hashtags = normalizeHashtag(value);
  const noValidHastags = hashtags.filter((item) => HASHTAG_VALID_REG.test(item) === false);
  return noValidHastags.length === 0;
};

const isDubleHashtags = (value) => {
  if(isEmptyStr(value)) {
    return true;
  }

  const hashtags = normalizeHashtag(value);
  const countItems = {};
  hashtags.forEach((item) => {
    const newItem = item.toUpperCase();
    countItems[newItem] = countItems[newItem] ? countItems[newItem] + 1 : 1;
  });
  const dubleHashtags = Object.keys(countItems).filter((item) => countItems[item] > 1);
  return dubleHashtags.length === 0;
};

const isLengthHashtags = (value) => {
  if (isEmptyStr(value)) {
    return true;
  }

  const hashtags = normalizeHashtag(value);
  return hashtags.length <= MAX_LENGTH;
};

const isCommentLength = (value) => {
  if (isEmptyStr(value)) {
    return true;
  }

  return value.length > 1 && value.length <= 140;
};

export { isHashtag, isDubleHashtags, isLengthHashtags, isCommentLength };
