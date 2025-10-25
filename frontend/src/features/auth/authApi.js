import api from '../../api';
// use axios base on frontend lecture
// https://axios-http.com/docs/api_intro
// https://blog.logrocket.com/axios-vs-fetch-2025/
// https://www.reddit.com/r/learnjavascript/comments/ymv7ex/why_do_people_use_axios_instead_of_fetch/
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

export const getMe = async (token) => {
  const response = await api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
