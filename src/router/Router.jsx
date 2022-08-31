import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import MainPage from '../pages/MainPage';
import DetailPage from '../pages/DetailPage'
import NotFoundPage from '../pages/NotFoundPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path='/detail' element={<DetailPage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;