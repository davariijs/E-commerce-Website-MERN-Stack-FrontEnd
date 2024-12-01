
import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/index';
import Women from './pages/Women/Women';
import Men from './pages/Men/Men';
import Footer from './pages/Footer/Footer';
import WomenTops from './pages/Women/WomenTops';
import WomenTShirts from './pages/Women/WomenTShirt';
import WomenShoes from './pages/Women/WomenShoes';
import WomenCoats from './pages/Women/WomenCoats';
import WomenDresses from './pages/Women/WomenDresses';
import WomenHoodies from './pages/Women/WomenHoodies';
import MenTops from './pages/Men/MenTops';
import MenTShirts from './pages/Men/MenTShirt';
import MenCoats from './pages/Men/MenCoats';
import MenShoes from './pages/Men/MenShoes';
import MenJeans from './pages/Men/MenJeans';
import MenHoodies from './pages/Men/MenHoodies';
import ProductDetails from './pages/ProductDetailsPage/SingleProductDetails';
import Account from './pages/Account/Account';


export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path="/"  element={<Home />}/>
          <Route path="/account"  element={<Account />}/>
          <Route path="women" element={<Women />}>
            <Route index  element={<WomenTops />} />
            <Route path=':id' element={<ProductDetails/>}/>
            <Route path='tops'  element={<WomenTops />} />
            <Route path='tops/:id' element={<ProductDetails/>}/>
            <Route path='t-shirts' element={<WomenTShirts />} />
            <Route path='t-shirts/:id' element={<ProductDetails/>}/>
            <Route path='shoes' element={<WomenShoes />} />
            <Route path='shoes/:id' element={<ProductDetails/>}/>
            <Route path='coats' element={<WomenCoats/>}/>
            <Route path='coats/:id' element={<ProductDetails/>}/>
            <Route path='dresses' element={<WomenDresses/>}/>
            <Route path='dresses/:id' element={<ProductDetails/>}/>
            <Route path='hoodies' element={<WomenHoodies/>}/>
            <Route path='hoodies/:id' element={<ProductDetails/>}/>
          </Route>
          
          <Route path="men" element={<Men/>}>
            <Route index  element={<MenTops />} />
            <Route path='tops'  element={<MenTops />} />
            <Route path='t-shirts' element={<MenTShirts/>} />
            <Route path='shoes' element={<MenShoes />} />
            <Route path='coats' element={<MenCoats/>}/>
            <Route path='jeans' element={<MenJeans/>}/>
            <Route path='hoodies' element={<MenHoodies/>}/>
          </Route>

          <Route path="*" element={<div>not found</div>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}