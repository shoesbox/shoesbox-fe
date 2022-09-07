import axios from "axios";


// 백엔드 연결 시 수정
// const BASE_URL = "http://localhost:3030";
const BASE_URL = "http://13.209.77.207";


// default, 보내지는 형식에 따라 알아서 content-type이 정해짐
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    credentials: true,
  }});

// form-data 형식
const apiForm = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// json data 형식
const apiJson = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// json data -utf 형식
const apiJsonUTF = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// header 부분에 추가하여 보낼 수 있음, 매번 수행
api.interceptors.request.use((config) => {
  const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3MgVG9rZW4iLCJlbWFpbCI6ImFAYSIsInVpZCI6IjYiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjYyNjAwNzEyfQ.AFrAUu2303tShr72DijSa_aEIDEQcTMiR8P_QeM8YrKIgnAK9dc1T3FikkFjnCKYuBzmz20yc6vRXry3kpVzjg';
  config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
});

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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
  }
)

export const apis = {
  // 로그인, 회원가입
  loginGoogle: () => api.get('/oauth2/authorization/google'),
  loginNaver: () => {},
  loginKakao: () => {},
  signup: () => {},

  // detail Page
  showDetail : (postId) => api.get(`/api/posts/${postId}`),
  showComment : (postId) => api.get(`/api/comments/${postId}`),
  addComment : (postId, content) => api.post(`/api/comments/${postId}`, content),
  delComment : (commentId) => api.delete(`/api/comments/${commentId}`),
  putComment : (commentId, payload) => api.put(`/api/comments/${commentId}`, payload),

  // write Page
  writeDaily : (payload) => api.post('/api/posts',payload),
  
  // add freinds
  acceptFriend : (fromMemberId) => api.put(`/api/friends/${fromMemberId}/accept`),
  refuseFriend : (fromMemberId) => api.put(`/api/friends/${fromMemberId}/refuse`),
  deleteFriend : (fromMemberId, payload) => api.put(`/api/friends/${fromMemberId}`, payload)



}