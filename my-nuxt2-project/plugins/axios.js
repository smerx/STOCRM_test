import axios from 'axios';

export default ({ $axios }, inject) => {
  const api = axios.create({
    baseURL: 'https://testirk.stocrm.ru/api/external/v1/',
    headers: {
      'Authorization': `Bearer YOUR_API_KEY`,
      'Content-Type': 'application/json'
    }
  });
  inject('api', api);


  api.getPostById = async (postId) => {
    try {
      const response = await api.get(`posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
};
