import React from "react";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { apis } from "../api";
import { setCookie } from "../shared/cookie";
import axios from "axios";

const Oauth2kakao = () => {
  const navigate = useNavigate();

  // console.log(code);
  useEffect(() => {
    const fetchUser = async () => {
      let code = new URL(window.location.href).searchParams.get("code");
      console.log("code", code);

      if(code){
        const res = await apis.loginKakao(code);
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
        alert('카카오 로그인 성공!')
      }
      else {
        alert('카카오 로그인에 실패했습니다.')
      }
    }
    fetchUser();
    navigate('/');
  }, [])

  return (
    <>
      <Spinner animation="border" />
    </>
  );
};

export default Oauth2kakao;
