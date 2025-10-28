import api from '../api';

export const getSpaces = async (token) => {
  const response = await api.get(`/spaces/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};