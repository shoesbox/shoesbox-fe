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
        const res = await axios.get(`http://13.209.77.207/oauth2/authorization/kakao?code=${code}`)
        const token = res.data?.data;
        setCookie(
          'kakaoToken',
          token.accessToken,
          token.accessTokenExpireDate
          );
        setCookie(
          'kakaorefreshToken',
          token.refreshToken,
          token.refreshTokenExpireDate
          );
        setCookie('memberId', token.memberId);
        navigate('/');
      }
      else {
        alert('카카오 로그인에 실패했습니다.')
      }
      fetchUser();
    }
  }, [])

  return (
    <>
      <Spinner animation="border" />
    </>
  );
};

export default Oauth2kakao;
