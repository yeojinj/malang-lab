import axios from 'axios';

const BASE_URL = 'https://api.malang-lab.com';

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

const authApi = axios.create({
  baseURL: BASE_URL,
});

authApi.interceptors.request.use(
  request => {
    const ACCESS_TOKEN = localStorage.getItem('token');
    request.headers.Authorization = ACCESS_TOKEN || null;
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

export { axios, authApi, BASE_URL };
