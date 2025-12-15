const BASE_API_URLS = {
  get: 'https://31.javascript.htmlacademy.pro/kekstagram/data',
  post: 'https://31.javascript.htmlacademy.pro/kekstagram/',
};

const sendRequest = (url, options) => fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    return response;
  });

const getData = () => sendRequest(BASE_API_URLS.get)
  .then((response) => response.json());

const setData = (body) => sendRequest(BASE_API_URLS.post, {
  method: 'POST',
  body,
})
  .then(() => true);


export { getData, setData };
