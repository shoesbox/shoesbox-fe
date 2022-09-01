import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import MainPage from '../pages/MainPage';
import DetailPage from '../pages/DetailPage';
import WritePage from '../pages/WritePage';
import NotFoundPage from '../pages/NotFoundPage';
// import WritePage from '../pages/WritePage';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
