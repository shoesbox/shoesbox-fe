import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from '../components/Header'
import Detailpage from '../pages/DetailPage'


const Router = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/detail' element={<Detailpage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default Router