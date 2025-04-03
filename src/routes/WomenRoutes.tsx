import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../components/Loading/loading';

const Women = React.lazy(() => import('../pages/Women/Women'));
const WomenTops = React.lazy(() => import('../pages/Women/WomenTops'));
const WomenTShirts = React.lazy(() => import('../pages/Women/WomenTShirt'));
const WomenShoes = React.lazy(() => import('../pages/Women/WomenShoes'));
const WomenCoats = React.lazy(() => import('../pages/Women/WomenCoats'));
const WomenDresses = React.lazy(() => import('../pages/Women/WomenDresses'));
const WomenHoodies = React.lazy(() => import('../pages/Women/WomenHoodies'));
const ProductDetails = React.lazy(() => import('../pages/ProductDetailsPage/SingleProductDetails'));

const WomenRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Women />}>
          <Route index element={<WomenTops />} />
          <Route path="tops" element={<WomenTops />} />
          <Route path=":id" element={<ProductDetails />} />
          <Route path="tops/:id" element={<ProductDetails />} />
          <Route path="t-shirts" element={<WomenTShirts />} />
          <Route path="t-shirts/:id" element={<ProductDetails />} />
          <Route path="shoes" element={<WomenShoes />} />
          <Route path="shoes/:id" element={<ProductDetails />} />
          <Route path="coats" element={<WomenCoats />} />
          <Route path="coats/:id" element={<ProductDetails />} />
          <Route path="dresses" element={<WomenDresses />} />
          <Route path="dresses/:id" element={<ProductDetails />} />
          <Route path="hoodies" element={<WomenHoodies />} />
          <Route path="hoodies/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default WomenRoutes;
