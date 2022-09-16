import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCookie } from '../shared/cookie';
import Header from '../components/Header';
import MainPage from '../pages/MainPage';
import DetailPage from '../pages/DetailPage';
import WritePage from '../pages/WritePage';
import EditPage from '../pages/EditPage';
import NotFoundPage from '../pages/NotFoundPage';
import Oauth2kakao from '../components/Oauth2kakao';
import MyPage from '../pages/MyPage';

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
        {/* detail 페이지는 중간 쿠션으로 이후 사라질 예정 */}
        <Route
          path="/detail"
          element={isLoggedIn ? <DetailPage /> : <Navigate replace to="/" />}
        />
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
        <Route path="*" element={<NotFoundPage />} />
        <Route path='/oauth2/authorization/kakao' element={<Oauth2kakao />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
