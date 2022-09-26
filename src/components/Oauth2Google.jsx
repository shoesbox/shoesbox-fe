import React from 'react'
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate, redirect } from 'react-router-dom';
import { apis } from '../api';
import { cookies, setCookie } from '../shared/cookie';
import { useState } from 'react';
import { useRef } from 'react';
import { useDispatch} from 'react-redux';
import { getUserThunk } from '../features/calenderSlice';

const Oauth2Google = () => {
  const navigate = useNavigate();
  let userInfos = useRef(); 
  // const dispatch = useDispatch();
let code = new URL(window.location.href).searchParams.get('code');
  // console.log('code', code);
  const fetchUser = async () => {
    if (code) {
      apis.loginGoogle(code)
      .then((res) => res.data?.data)
      .then((token) => {
        userInfos.current = token;
        // window.sessionStorage.setItem("userInfo", JSON.stringify(token));
        // console.log(userInfos.current);
      }).then(
        setTimeout(() => {
          navigate(`/?loading=true`,{state:userInfos.current});
        }, 1000)
      )
    } else {
      alert('구글 로그인에 실패했습니다.');
    }
  };
  useEffect(() => {
      fetchUser();  
  }, []);

  return (
    <Spinner animation="border" />
  )
}

export default Oauth2Google;