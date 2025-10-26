import api from '../api';

export const getReservation = async (token, id) => {
  const response = await api.get(`/reservations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};