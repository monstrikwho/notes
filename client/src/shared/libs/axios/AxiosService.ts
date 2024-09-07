import axios from 'axios';
import { API_URL } from 'shared/configs';
import { handleError } from './handleError';

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['user-id'] = JSON.parse(localStorage.getItem('userId') || '""');
    return config;
  },
  (error) => {
    return handleError(error);
  },
);

export const AxiosService = axios;
