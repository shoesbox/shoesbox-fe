import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCookie } from '../shared/cookie';
import Header from '../components/Header';
import MainPage from '../pages/MainPage';
import WritePage from '../pages/WritePage';
import EditPage from '../pages/EditPage';
import NotFoundPage from '../pages/NotFoundPage';
import Oauth2kakao from '../components/Oauth2kakao';
import MyPage from '../pages/MyPage';
import Oauth2Naver from '../components/Oauth2Naver';

const Router = () => {
  const memberId = getCookie('memberId');
  // const cookie = getCookie('accessToken');

  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    if (memberId !== undefined) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, [memberId]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
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
        />
        <Route path="/oauth/callback/kakao" element={<Oauth2kakao />} />
        <Route path="/oauth/callback/naver" element={<Oauth2Naver />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
