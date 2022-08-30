import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Main from '../pages/Main';
import NotFound from '../pages/NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
