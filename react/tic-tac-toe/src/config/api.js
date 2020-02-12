import { create } from 'apisauce';

export const defaultHeaders = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000
};

const api = create(defaultHeaders);

const token = localStorage.getItem('token');
if (token !== null) {
  api.setHeader('token', token);
}

export default api;
