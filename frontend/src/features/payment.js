import api from '../api';

export const createCheckoutSession = async (token, amount) => {
  const response = await api.post(`stripe/checkout`, {
    amount
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },    
  });
  return response.data;
}