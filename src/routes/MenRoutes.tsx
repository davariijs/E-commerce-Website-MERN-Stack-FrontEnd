import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../components/Loading/loading';

const Men = React.lazy(() => import('../pages/Men/Men'));
const MenTops = React.lazy(() => import('../pages/Men/MenTops'));
const MenTShirts = React.lazy(() => import('../pages/Men/MenTShirt'));
const MenShoes = React.lazy(() => import('../pages/Men/MenShoes'));
const MenCoats = React.lazy(() => import('../pages/Men/MenCoats'));
const MenJeans = React.lazy(() => import('../pages/Men/MenJeans'));
const MenHoodies = React.lazy(() => import('../pages/Men/MenHoodies'));
const ProductDetails = React.lazy(() => import('../pages/ProductDetailsPage/SingleProductDetails'));

const MenRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Men />}>
          <Route index element={<MenTops />} />
          <Route path="tops" element={<MenTops />} />
          <Route path="t-shirts" element={<MenTShirts />} />
          <Route path="shoes" element={<MenShoes />} />
          <Route path="coats" element={<MenCoats />} />
          <Route path="jeans" element={<MenJeans />} />
          <Route path="hoodies" element={<MenHoodies />} />
          <Route path=":id" element={<ProductDetails />} />
          <Route path="tops/:id" element={<ProductDetails />} />
          <Route path="t-shirts/:id" element={<ProductDetails />} />
          <Route path="shoes/:id" element={<ProductDetails />} />
          <Route path="coats/:id" element={<ProductDetails />} />
          <Route path="jeans/:id" element={<ProductDetails />} />
          <Route path="hoodies/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default MenRoutes;
