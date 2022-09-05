import axios from "axios";


// 백엔드 연결 시 수정
const BASE_URL = "http://localhost:3000";

// 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }});


const apiUTF = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    credentials: true,
  },
});

const apiForm = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const apiJson = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3MgVG9rZW4iLCJlbWFpbCI6ImFAYSIsInVpZCI6IjYiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjYyMzU4OTcyfQ.AamPPjtqMoUtlu9VwextcSOM0t21KwSf26107-ynRnbKUk-1x0T35_qMpNuxQcKVo-8AnYHVb8IQB4l-qUen6A';
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

const apiMulti = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

const auth = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

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
  loginGoogle: () => {api.get('/')},
  loginNaver: () => {},
  loginKakao: () => {},
  signup: () => {},

  // ... 나머지 ...

}