import React from 'react'
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate, redirect } from 'react-router-dom';
import { apis } from '../api';
import { cookies, setCookie } from '../shared/cookie';
import { useState } from 'react';
import { useRef } from 'react';

const Oauth2Google = () => {
  const navigate = useNavigate();
  let userInfos = useRef(); 
  
let code = new URL(window.location.href).searchParams.get('code');
  console.log('code', code);
  const fetchUser = async () => {
    if (code) {
      apis.loginGoogle(code)
      .then((res) => res.data?.data)
      .then((token) => {
        userInfos.current = token;
        console.log(userInfos.current);
        // window.sessionStorage.setItem('accessToken',  token.accessToken);
        // window.sessionStorage.setItem('accessTokenExpireDate',  userInfos.current.accessToken);
        // window.sessionStorage.setItem('refreshToken',  userInfos.current.accessToken);
        // window.sessionStorage.setItem('refreshTokenExpireDate',  userInfos.current.accessToken);
        // window.sessionStorage.setItem('memberId',  userInfos.current.accessToken);
        // window.sessionStorage.setItem('email',  userInfos.current.accessToken);
        // window.sessionStorage.setItem('nickname',  userInfos.current.accessToken);
        // let date = new Date();
        // date.setTime(token.accessTokenExpireDate);
        // cookies.set('cookie', token.accessToken, { 
        //   path: 'http://localhost:3000/',
        //   expires: date.toUTCString() }
        // );
        
        // setCookie(
        //   'accessToken',
        //   token.accessToken,
        //   token.accessTokenExpireDate
        // );
        // setCookie(
        //   'refreshToken',
        //   token.refreshToken,
        //   token.refreshTokenExpireDate
        // );
        // setCookie('memberId', token.memberId);
        // setCookie('email', token.email);
        // setCookie('nickname', token.nickname);

        // setCookie(
        //   'accessToken',
        //   userInfos.current.accessToken,
        //   userInfos.current.accessTokenExpireDate
        // );
        // setCookie(
        //   'refreshToken',
        //   userInfos.current.refreshToken,
        //   userInfos.current.refreshTokenExpireDate
        // );
        // setCookie('memberId', userInfos.current.memberId);
        // setCookie('email', userInfos.current.email);
        // setCookie('nickname', userInfos.current.nickname);
      })
    } else {
      alert('구글 로그인에 실패했습니다.');
    }
  };
  useEffect(() => {
      fetchUser();  
      setTimeout(() => {
        navigate('/',{state:userInfos.current});
        // navigate('/?google=true',{state:userInfos.current});
        // navigate(`/?token=${JSON.stringify(userInfos.current)}`, {state:userInfos.current});
        // window.location.reload(true);
        // navigate(`/`);
      }, 1000);
  }, []);

  return (
    <Spinner animation="border" />
  )
}

export default Oauth2Google;