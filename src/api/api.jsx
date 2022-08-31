import axios from "axios";


// 백엔드 연결 시 수정
const BASE_URL = "http://localhost:3000";
// const BASE_URL = "http://localhost:3000/api";

// 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',

  },
  credentials: true,
})

const apiForm = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

const apiJson = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  // const accessToken = ;
  // config.headers['Authorization'] = `Bearer ${accessToken}`;
})

apiForm.interceptors.request.use((config) => {
  // const accessToken = ;
  // config.headers['Authorization'] = `Bearer ${accessToken}`;
})

apiJson.interceptors.request.use((config) => {
  // const accessToken = ;
  // config.headers['Authorization'] = `Bearer ${accessToken}`;
})



export const apis = {
  // 로그인, 회원가입
  loginGoogle: () => {},
  loginNaver: () => {},
  loginKakao: () => {},
  signup: () => {},

  getDetail:(postId) =>{
    api.get(`/posts/${postId}`)
  },
  postDaily:(payload)=>{
    api.post('/posts', payload)
  },
  getComment:(postId) => {
    api.get(`/posts/${postId}/comments`)
  },
  postComment:(postId, payload) => {
    api.post(`/posts/${postId}/comments`, payload)
  },
  delComment:(postId, commentId) =>{
    api.delete(`/posts/${postId}/comments/${commentId}`)
  }

}