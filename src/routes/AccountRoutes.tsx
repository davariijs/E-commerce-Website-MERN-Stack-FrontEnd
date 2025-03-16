import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../components/Loading/loading';


const Account = React.lazy(() => import('../pages/Account/Account'));
const Orders = React.lazy(() => import('../pages/Account/Orders'));
const Wishlist = React.lazy(() => import('../pages/Account/Wishlist'));
const MyInfo = React.lazy(() => import('../pages/Account/MyInfo'));
const OrderDetails = React.lazy(() => import('../pages/Account/OrderDetails'));

const AccountRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Account />}>
          <Route index element={<Orders />} />
          <Route path="orders" element={<Orders />} />
          <Route path="my-info" element={<MyInfo />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path=":id" element={<OrderDetails />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AccountRoutes;