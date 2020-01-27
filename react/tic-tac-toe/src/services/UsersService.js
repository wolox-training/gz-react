import api from '../config/api';

const login = data => api.post('/login', data);

export default login;
