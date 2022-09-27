import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCookie } from '../shared/cookie';
import Header from '../components/Header';
import MainPage from '../pages/MainPage';
import AboutUsPage from '../pages/AboutUsPage';
import WritePage from '../pages/WritePage';
import EditPage from '../pages/EditPage';
import NotFoundPage from '../pages/NotFoundPage';
import MyPage from '../pages/MyPage';
import Oauth2Kakao from '../components/Oauth2Kakao';
import Oauth2Naver from '../components/Oauth2Naver';
import Oauth2Google from '../components/Oauth2Google';
import { setIsLogin } from '../features/loginSlice';
import { useSelector, useDispatch } from 'react-redux';

const Router = () => {
  let memberId = getCookie('memberId');

  const dispatch = useDispatch();
  const cookie = getCookie('refreshToken');
  const isLoggedIn = useSelector((state) => state.login.value);
  useEffect(() => {
    if (cookie !== undefined) {
      dispatch(setIsLogin(true));
    } else {
      dispatch(setIsLogin(false));
    }
  }, [cookie]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route
          path="/write"
          element={isLoggedIn ? <WritePage /> : <Navigate replace to="/" />}
        />
        <Route
          path="/edit"
          element={isLoggedIn ? <EditPage /> : <Navigate replace to="/" />}
        />
        <Route
          path="/mypage"
          element={
            isLoggedIn ? (
              <MyPage memberId={memberId} />
            ) : (
              <Navigate replace to="/" />
            )
          }
          // element={<MyPage memberId={memberId} />}
        />
        <Route path="/oauth/callback/kakao" element={<Oauth2Kakao />} />
        <Route path="/oauth/callback/naver" element={<Oauth2Naver />} />
        <Route path="/oauth/callback/google" element={<Oauth2Google />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
