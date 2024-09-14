import axios from 'axios';

export default ({ $axios }, inject) => {
  const api = axios.create({
    baseURL: 'https://testirk.stocrm.ru/api/external/v1/',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  inject('api', api);


  api.getCalendarEntriesByPost = async (customerId, date) => {
    try {
      const response = await api.get('calendar/card/get', {
        params: {
          SID: '10007_b7e70c58771c3305d98b6314b789b2b1',
          CUSTOMER_ID: customerId,
          DATE: date
        }
      });
      console.log(response.data);
      return response.data; // Возвращаем массив записей
    } catch (error) {
      console.error('Ошибка при получении записей на пост:', error.response ? error.response.data : error);
      return null;
    }
  };



  api.getAllCalendarEntries = async (filter = {}, sort = {}, page = 1, limit = 100) => {
    try {
      const response = await api.post('calendar/post/get_filtered', {
        SID: '10007_b7e70c58771c3305d98b6314b789b2b1',
        FILTER: filter,
        SORT: sort,
        PAGE: page,
        LIMIT: limit
      });
      return response.data.RESPONSE.DATA;
    } catch (error) {
      console.error('Ошибка при получении всех записей календаря:', error);
      return null;
    }
  };


  api.createCalendarEntry = async (data) => {
    try {
      const response = await api.post('calendar/card/new', {
        SID: '10007_b7e70c58771c3305d98b6314b789b2b1',
        ...data
      });
      return response.data.RESPONSE;
    } catch (error) {
      console.error('Ошибка при создании записи в календаре:', error);
      return null;
    }
  };
};
