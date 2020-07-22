import axios from 'axios';
// import { setList, getList } from '../utils/localStorageHelper';

export const BASE_API_URL = 'https://images-api.nasa.gov';

const headers = {
  'Content-Type': 'application/json'
};

let instance = axios.create({
  baseURL: BASE_API_URL,
  responseType: 'json',
  headers
});

// Interceptors for request
instance.interceptors.request.use(config => {
  const source = axios.CancelToken.source();
  config.cancelToken = source.token;
  return config;
});

// Interceptors for response
instance.interceptors.response.use(
  resp => resp.data,
  err => {
    return Promise.reject(err);
  }
);

export default instance;
