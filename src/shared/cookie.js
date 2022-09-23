import Cookies from 'universal-cookie';

// 쿠키 객체 생성
export const cookies = new Cookies();

// 쿠키에 저장할 때
// export const setCookie = (name, value, exp = 5) => {
export const setCookie = (name, value, exp) => {
  let date = new Date();
  // 백에서 만료시간을 설정하지 않은 경우 저장 시 만료시간 설정
  // date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  date.setTime(exp);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
  // return cookies.set(name, value, { expires: date.toUTCString() });
};

// 쿠키에 저장한 거 쓸 때
export const getCookie = (name) => {
  return cookies.get(name);
};

// 쿠키 지울 때
export const deleteCookie = (name) => {
  // let date = new Date('2020-01-01').toUTCString();
  // document.cookie = name + '=; expires=' + date;
  return cookies.remove(name);
  // setCookie(name, '', -1);
};
