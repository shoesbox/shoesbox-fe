import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apis } from '../api';
import { setCookie } from '../shared/cookie';

const Oauth2Google = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  // console.log('google', code);

  useEffect(() => {
    const fetchUser = async () => {
      if (code) {
        apis
          .loginGoogle(code)
          .then((res) => res.data?.data)
          .then((token) => {
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
        alert('구글 로그인에 실패했습니다.');
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

export default Oauth2Google;
