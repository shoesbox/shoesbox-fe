import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apis } from '../api';
import { setCookie } from '../shared/cookie';

const Oauth2Naver = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const code = new URL(window.location.href).searchParams.get('code');
      // console.log('naver', code);

      if (code) {
        apis.loginNaver(code).then((res) => {
          const token = res.data?.data;
          // console.log(token);
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
        });
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
    <div className="loading-container">
      <div className="loading">
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Oauth2Naver;
