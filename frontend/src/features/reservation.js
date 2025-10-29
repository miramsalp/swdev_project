import api from '../api';

export const getReservations = async (token) => {
  const response = await api.get(`/reservations/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getReservation = async (token, id) => {
  const response = await api.get(`/reservations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const deleteReservation = async (token, id) => {
  const response = await api.delete(`/reservations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const addReservation = async (token, userData, spaceId) => {
  const response = await api.post(`spaces/${spaceId}/reservations`, {
    reservationDate: userData
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },    
  });
  return response.data;
}