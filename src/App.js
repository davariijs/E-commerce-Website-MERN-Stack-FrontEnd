
import React, { useEffect, useState } from 'react';
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
import InfoAccount from './pages/Account/InfoAccount';
import ConfirmedOrder from './components/confirmedOrder/ConfirmedOrder';
import CartEmpty from './components/CartEmpty/CartEmpty';
import NotFound from './components/NotFound/NotFound';
import Login from './pages/Login-SignUp/Login';
import Signup from './pages/Login-SignUp/SignUp';
import ResetPassword from './pages/Login-SignUp/ResetPassword';
import CheckEmail from './pages/Login-SignUp/CheckEmail';
import Verification from './pages/Login-SignUp/Verification';
import NewPassword from './pages/Login-SignUp/NewPassword';
import Cart from './pages/Cart/Cart';
import Wishlist from './pages/Account/Wishlist';
import Orders from './pages/Account/Orders';
import MyInfo from './pages/Account/MyInfo';
import OrderDetails from './pages/Account/OrderDetails';
import CheckOut from './pages/CheckOut/CheckOut';
import { auth } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {

  const [email,setEmail] = useState(null);
  const [name,setName] = useState(null);
  const [uid,setUid] = useState(null);

  
  
  useEffect(() => {
    function userState () {
        onAuthStateChanged(auth, (user) => {
            if (user) {
            const uid = user.uid;
            setUid(uid);
            console.log(uid, name);
            setEmail(user.email);
            setName(user.displayName);
            // ...
            } else {
            setUid(null);
            setEmail(null);
            setName(null);
            }
        });
    }
    userState();
  }, [uid,email,name]);

  return (
    <BrowserRouter>
    <Navbar uid={uid}/>
      <Routes>
          <Route path="/"  element={<Home />}/>
          <Route path="/login"  element={<Login />}/>
          <Route path="/check-out"  element={<CheckOut />}/>
          <Route path="account" element={<Account email={email} uid={uid} name={name}/>}>
            <Route index  element={<Orders />} />
            <Route path='orders'  element={<Orders />} />
            <Route path='my-info' element={<MyInfo/>}/>
            <Route path='wishlist'  element={<Wishlist />} />
            <Route path='order-details'  element={<OrderDetails />} />
          </Route>
          <Route path="/sign-up"  element={<Signup />}/>
          <Route path="/reset-password"  element={<ResetPassword />}/>
          <Route path="/check-email"  element={<CheckEmail />}/>
          <Route path="/verification-code"  element={<Verification />}/>
          <Route path="/new-password"  element={<NewPassword />}/>
          <Route path="/confirmed-order"  element={<ConfirmedOrder />}/>
          <Route path="/cart-empty"  element={<CartEmpty />}/>
          <Route path="/cart"  element={<Cart />}/>
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

          <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}