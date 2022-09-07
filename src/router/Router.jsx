import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCookie } from '../shared/cookie';
import Header from '../components/Header';
import MainPage from '../pages/MainPage';
import DetailPage from '../pages/DetailPage';
import WritePage from '../pages/WritePage';
import NotFoundPage from '../pages/NotFoundPage';
import MyPage from '../pages/MyPage';

const Router = () => {
  const cookie = getCookie('accessToken');
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    if (cookie !== undefined) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, [cookie]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/detail"
          element={isLoggedIn ? <DetailPage /> : <Navigate replace to="/" />}
        />
        <Route
          path="/write"
          element={isLoggedIn ? <WritePage /> : <Navigate replace to="/" />}
        />
        <Route
          path="/mypage"
          element={isLoggedIn ? <MyPage /> : <Navigate replace to="/" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
