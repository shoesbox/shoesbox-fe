import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import { getCookie } from '../shared/cookie';
import Header from '../components/Header';
import MainPage from '../pages/MainPage';
import DetailPage from '../pages/DetailPage';
import WritePage from '../pages/WritePage';
import NotFoundPage from '../pages/NotFoundPage';
import { useEffect } from 'react';
import { useState } from 'react';

const Router = () => {
  const cookie = getCookie('accessToken');
  const [isLoggedin, setisLoggedin] = useState(false);
  useEffect(() => {
    if (cookie !== undefined) {
      setisLoggedin(true);
    } else {
      setisLoggedin(false);
    }
  }, [cookie]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {isLoggedin ? (
          <>
            <Route path="/detail" element={<DetailPage />} />
            <Route path="/write" element={<WritePage />} />
          </>
        ) : null}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
