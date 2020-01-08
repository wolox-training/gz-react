import api from '../config/api';

const getMatches = () => api.get('/matches');

export default getMatches;
