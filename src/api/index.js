import axios from 'axios';
import { getCookie } from '../shared/cookie';

// 백엔드 연결 시 수정
// const BASE_URL = "http://localhost:3000";
const BASE_URL = 'http://13.209.77.207';


// 1. Axios instance 생성
// default, 보내지는 형식에 따라 알아서 content-type이 정해짐
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    credentials: true,
  },
});

// form-data 형식
const apiForm = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// json data 형식
const apiJson = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// json data -utf 형식
const apiJsonUTF = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
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

apiForm.interceptors.request.use((config) => {
  // const accessToken = ;
  // config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
});

apiJson.interceptors.request.use((config) => {
  // const accessToken = ;
  // config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
});


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
  // 로그인, 회원가입 api
  loginGoogle: () => api.get('/'),
  loginNaver: () => {},
  loginKakao: () => {},
  joinUser: (userData) => auth.post('/api/members/auth/signup', userData),
  loginUser: (userData) => auth.post('/api/members/auth/login', userData),

  // 메인페이지 일기 조회
  getTodayMyPosts: () => api.get('/api/posts'),
  getTargetPosts: (memberId, year, month) =>
    api.get(`/api/posts?id=${memberId}&y=${year}&m=${month}`),

  // 게시글 상세 및 댓글 api
  showDetail: (postId) => api.get(`/api/posts/${postId}`),
  showComment: (postId) => api.get(`/api/comments/${postId}`),
  addComment: (postId, content) => api.post(`/api/comments/${postId}`, content),
  delComment: (commentId) => api.delete(`/api/comments/${commentId}`),
  putComment: (commentId, payload) =>
    api.put(`/api/comments/${commentId}`, payload),

  // 글작성 api
  writeDaily: (payload) => api.post('/api/posts', payload),

  // 친구 관련 api
  acceptFriend: (fromMemberId) =>
    api.put(`/api/friends/${fromMemberId}/accept`),
  refuseFriend: (fromMemberId) =>
    api.put(`/api/friends/${fromMemberId}/refuse`),
  deleteFriend: (fromMemberId, payload) =>
    api.put(`/api/friends/${fromMemberId}`, payload),
};
