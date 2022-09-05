import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (name, value) => {
  return cookies.set(name, value, {
      path:'/',
  })
}

// 쿠키 저장 안되면 이걸로 해볼 것
// export const setCookie = (name, value, exp) => {
//     let date = new Date();
//     date.setTime(exp);
//     document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
// }

export const getCookie = (name) => {
  return cookies.get(name);
}

export const removeCookie = (name) => {
  return cookies.remove(name);
}