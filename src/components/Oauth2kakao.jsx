import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { apis } from '../api';
import { setCookie } from '../shared/cookie';

const Oauth2kakao = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      let code = new URL(window.location.href).searchParams.get('code');
      console.log('code', code);
      console.log('쿼리 스트링', `/oauth2/authorization/kakao?code=${code}`)

      if (code) {
        const res = await apis.loginKakao(code);

        console.log('리스폰스 데이터', res);

        const token = res.data?.data;
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
        alert('카카오 로그인 성공!');
      } else {
        alert('카카오 로그인에 실패했습니다.');
      }
    };
    fetchUser();

    // setTimeout(() => {
    //   navigate('/');
    // }, 2000);
  }, []);

  return (
    <>
      <Spinner animation="border" />
    </>
  );
};

export default Oauth2kakao;
