import axios from 'axios';
import { getCookie } from '../shared/cookie';

// export const BASE_URL = process.env.REACT_APP_BASE_URL;
// export const BASE_URL ='http://43.201.31.170';
// const BASE_URL ='http://15.164.250.22';
// const BASE_URL ='http://13.125.161.17';
export const BASE_URL ='https://webstudy.shop';

// 1. Axios instance 생성
// default, 보내지는 형식에 따라 알아서 content-type이 정해짐
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    credentials: true,
    'Content-Type': 'application/json;charset=UTF-8',
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
  headers: {
    credentials: true,
    // 'Content-Type': 'application/json;charset=utf-8',
  },
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

apiForm.interceptors.request.use(
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
    // alert(err.response.data.errorDetails.apierror.message);
    return Promise.reject(err);
  }
);

apiForm.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    // alert(err.response.data.errorDetails.apierror.message);
    return Promise.reject(err);
  }
);

// 4. apis
export const apis = {
  // 소셜 로그인
  loginKakao: (code) => auth.get(`oauth2/authorization/kakao?code=${code}`),
  loginGoogle: (code) => auth.get(`oauth2/authorization/google?code=${code}`),
  loginNaver: (code) => auth.get(`oauth2/authorization/naver?code=${code}`),

  // jwt 로그인, 회원가입
  joinUser: (userData) => auth.post('/api/members/auth/signup', userData),
  loginUser: (userData) => auth.post('/api/members/auth/login', userData),
  logoutUser: () => api.get('/api/members/logout'),

  // guest 로그인
  guestUser: () => api.post('/api/members/auth/login/guest'),

  // 메인페이지 일기 조회
  // getTodayMyPosts: () => api.get('/api/posts'),
  getTargetPosts: (memberId, year, month) =>
    api.get(`/api/posts?id=${memberId}&y=${year}&m=${month}`),

  // 게시글 상세 api - done
  showDetail: (postId) => api.get(`/api/posts/${postId}`),
  writeDaily: (payload) => apiForm.post('/api/posts', payload),
  deleteDetail: (postId) => api.delete(`/api/posts/${postId}`),
  editDetail: (postId, payload) => api.patch(`/api/posts/${postId}`, payload),

  // 게시글 상세 댓글 api - done
  showComment: (postId) => api.get(`/api/comments/${postId}`),
  addComment: (postId, content) => api.post(`/api/comments/${postId}`, content),
  delComment: (commentId) => api.delete(`/api/comments/${commentId}`),
  putComment: (commentId, payload) =>
    api.put(`/api/comments/${commentId}`, payload),

  // 친구 관련 api - done
  getFriendList: () => api.get('/api/friends'),
  getRequestedFriendList: () => api.get('/api/friends/requested'),
  getRequestFriendList: () => api.get('/api/friends/request'),
  addFriend: (payload) => api.post('/api/friends', payload),
  acceptFriend: (fromMemberId) =>
    api.put(`/api/friends/${fromMemberId}/accept`),
  refuseFriend: (fromMemberId) =>
    api.delete(`/api/friends/${fromMemberId}/refuse`),
  deleteFriend: (memberId) => api.delete(`/api/friends/${memberId}`),
  cancleFriend: (toMemberId) => api.delete(`/api/friends/${toMemberId}/cancle`),

  // 알람 기능
  getAlarmList: () => api.get('/api/alarm'),
  deleteAlarm: (alarmId) => api.delete(`/api/alarm/${alarmId}`),
  deleteAlarmAll: () => api.delete('/api/alarm'),

  // 마이페이지
  getUserData: (memberId) => api.get(`/api/members/info?m=${memberId}`),
  updateUserData: (memberId, payload) =>
    apiForm.patch(`/api/members/info?m=${memberId}`, payload),
  resetProfileImg: () => api.get(`/api/members/reset`),
  removeAccount: (memberId) => api.delete(`/api/members/delete?m=${memberId}`),
};
