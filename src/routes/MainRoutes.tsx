import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../components/Loading/loading';

// Lazy-loaded components
const Home = React.lazy(() => import('../pages/Home/Home'));
const Login = React.lazy(() => import('../pages/Login-SignUp/Login'));
const Signup = React.lazy(() => import('../pages/Login-SignUp/SignUp'));
const CheckOut = React.lazy(() => import('../pages/CheckOut/CheckOut'));
const ConfirmedOrder = React.lazy(() => import('../components/confirmedOrder/ConfirmedOrder'));
const CartEmpty = React.lazy(() => import('../components/CartEmpty/CartEmpty'));
const Cart = React.lazy(() => import('../pages/Cart/Cart'));
const ProductDetails = React.lazy(() => import('../pages/ProductDetailsPage/SingleProductDetails'));
const NotFound = React.lazy(() => import('../pages/NotFound/NotFound'));

// Routes for Women, Men, and Account
const WomenRoutes = React.lazy(() => import('./WomenRoutes'));
const MenRoutes = React.lazy(() => import('./MenRoutes'));
const AccountRoutes = React.lazy(() => import('./AccountRoutes'));

const MainRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/confirmed-order" element={<ConfirmedOrder />} />
        <Route path="/cart-empty" element={<CartEmpty />} />
        <Route path="/cart" element={<Cart />} />

        {/* Nested Routes */}
        <Route path="/women/*" element={<WomenRoutes />} />
        <Route path="/men/*" element={<MenRoutes />} />
        <Route path="/account/*" element={<AccountRoutes />} />

        {/* Dynamic Product Details Route */}
        <Route path=":id" element={<ProductDetails />} />

        {/* Catch-all Route for NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;