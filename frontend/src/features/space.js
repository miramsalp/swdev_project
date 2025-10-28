import api from '../api';

export const getSpaces = async () => {
  const response = await api.get('/spaces');
  return response.data;
};