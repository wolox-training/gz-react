import { create } from 'apisauce';

const api = create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000
});

const token = localStorage.getItem('token');
if (token !== null) {
  api.setHeader('token', token);
}

export default api;
