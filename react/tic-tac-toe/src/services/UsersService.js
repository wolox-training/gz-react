import api from '../config/api';

export const login = data => api.post('/login', data);
export const logout = () => api.post('/logout');
