import axios from 'axios';
import { getCookie } from '../shared/cookie';

// 백엔드 연결 시 수정
// const BASE_URL = "http://localhost:3000";
const BASE_URL = 'http://13.209.77.207';

// 1. Axios instance 생성
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

// 2. request interceptor
// 인증이 필요한 요청을 중간에 가로채서 헤더에 토큰 소매넣기 해주기
api.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    config.headers['Refresh-token'] = refreshToken;
    return config;
  },
  (error) => {
    console.log(error);
  }
);

apiMulti.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    config.headers['Refresh-token'] = refreshToken;
    return config;
  },
  (error) => {
    console.log(error);
  }
);

// 3. response interceptor
api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err);
  }
);

// 4. apis
export const apis = {
  // 로그인, 회원가입
  loginGoogle: () => api.get('/'),
  loginNaver: () => {},
  loginKakao: () => {},
  joinUser: (userData) => auth.post('/api/members/auth/signup', userData),
  loginUser: (userData) => auth.post('/api/members/auth/login', userData),

  //main page
  getTargetPosts: (memberId, year, month) => api.get(`/api/posts`),
  //?id=${memberId}&y=${year}&m=${month}

  // detail Page
  showDetail: (postId) => api.get(`/posts/${postId}`),
  showComment: (postId) => api.get(`comments/${postId}`),
  addComment: (postId, content) => api.post(`/comments/${postId}`, content),
  delComment: (commentId) => api.delete(`/comments/${commentId}`),
  putComment: (commentId, payload) =>
    api.put(`/comments/${commentId}`, payload),
};
