import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://diary-be.azurewebsites.net',
// baseURL: 'http://localhost:8080',
});

// 요청 전 인터셉터: 헤더에 토큰 추가
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 후 인터셉터: 성공 및 에러 응답 처리
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 404) {
      console.log('토큰이 만료되었습니다.');
    }
    return Promise.reject(error);
  }
);

export default instance;