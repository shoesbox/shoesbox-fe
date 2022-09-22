import React from 'react'
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { apis } from '../api';
import { setCookie } from '../shared/cookie';


const Oauth2Naver = () => {
  const navigate = useNavigate()
  let code = new URL(window.location.href).searchParams.get('code');
  console.log('code', code);

  useEffect(() => {
    const fetchUser = async () => {

      if (code) {

        apis.loginNaver(code)
        .then(res => res.data?.data)
        .then(token => {
          setCookie(
            'accessToken',
            token.accessToken,
            token.accessTokenExpireDate
          );
          setCookie(
            'refreshToken',
            token.refreshToken,
            token.refreshTokenExpireDate
          );
          setCookie('memberId', token.memberId);
          setCookie('email', token.email);
          setCookie('nickname', token.nickname);
        })
      } else {
        alert('네이버 로그인에 실패했습니다.');
      }
    };
    fetchUser();

    setTimeout(() => {
      navigate('/');
    }, 1000);
  }, []);

  return (
    <>
      <Spinner animation="border" />
    </>
  )
}

export default Oauth2Naver;