import axios from 'axios';

// 백엔드 연결 시 수정
// const BASE_URL = "http://localhost:3000";
const BASE_URL = 'http://13.209.77.207';

// 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
const apiMulti = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
const auth = axios.create({
  baseURL: BASE_URL,
});

//인터셉터

// 토큰 관련 로직이  추가
// api.interceptors.request.use((config) => {
//   const accessToken = ;
//   config.headers['Authorization'] = `Bearer ${accessToken}`;
// })

// 토큰 관련 로직이 추가
// apiMulti.interceptors.request.use((config) => {
//   const accessToken = ;
//   config.headers['Authorization'] = `Bearer ${accessToken}`;
// })

// apis

export const apis = {
  // 로그인, 회원가입
  loginGoogle: () => api.get('/'),
  loginNaver: () => {},
  loginKakao: () => {},
  joinUser: (userData) => auth.post('/api/members/auth/signup', userData),
  loginUser: (userData) => auth.post('/api/members/auth/login', userData),

  // ... 나머지 ...
};
