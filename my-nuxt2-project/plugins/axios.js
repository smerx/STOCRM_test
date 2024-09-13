import axios from 'axios';

export default ({ $axios }, inject) => {
  const api = axios.create({
    baseURL: 'https://testirk.stocrm.ru/api/external/v1/',
    headers: {
      'Authorization': `Bearer 10007_b7e70c58771c3305d98b6314b789b2b1`,
      'Content-Type': 'application/json'
    }
  });
  inject('api', api);
};

