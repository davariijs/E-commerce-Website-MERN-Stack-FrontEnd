
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/index';
import Women from './pages/Women/Women';
import Men from './pages/Men/Men';
import Footer from './pages/Footer/Footer';
import FilterPart from './components/FilterPart/FilterPart';
import WomenTops from './pages/Women/WomenTops';
import WomenTShirts from './pages/Women/WomenTShirt';


export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path="/"  element={<Home />}/>
          <Route path="women" element={<Women />}>
            <Route index  element={<WomenTops />} />
            <Route path='tops'  element={<WomenTops />} />
            <Route path='t-shirts' element={<WomenTShirts />} />
          </Route>
          <Route path="men" element={<Men />} />
          <Route path="*" element={<div>not found</div>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}