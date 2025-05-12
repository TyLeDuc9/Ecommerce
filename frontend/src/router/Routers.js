import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Register } from '../components/Register/Register';
import { Login } from '../components/Login/Login';
import { SellerRegister } from '../components/Register/SellerRegister';
import { SellerLogin } from '../components/Login/SellerLogin';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { ProductCategory } from '../components/ProductCategory/ProductCategory';
import { Cart } from '../components/Cart/Cart';
import { Seller } from '../components/Seller/Seller';
import { AddProducts } from '../components/Seller/AddProducts';
import { Order } from '../components/Order/Order';
import { MyOrder } from '../components/MyOrder/MyOrder';
import { Support } from '../components/Support/Support';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import OrderDetail from '../components/OrderDetail/OrderDetail';
import { CustomerProfile } from '../components/Profile/CustomerProfile';
import { SellerShop } from '../components/Seller/SellerShop';
import {ShopPages } from '../components/Seller/ShopPages';

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<><Header /><Home /></>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/product/:category" element={<><Header /><ProductCategory /></>} />
        <Route path="/product/:category/:id" element={<><Header /><ProductDetails /></>} />
        <Route path="/cart" element={<><Header /><Cart /></>} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/seller/addProducts" element={<><Header /><AddProducts /></>} />
        <Route path="/order" element={<><Header /><Order /></>} />
        <Route path="/myOrder" element={<><Header /><MyOrder /></>} />
        <Route path="/orders/:id" element={<><Header /><OrderDetail /></>} />
        <Route path="/customerProfile" element={<><Header /><CustomerProfile /></>} />
        <Route path="/sellerShop" element={<><Header /><SellerShop /></>} />
        <Route path="/shop/:sellerId" element={<><Header /><ShopPages /></>} />
        <Route path="/support" element={<><Support /></>} />

      </Routes>
      <Footer />
    </>
  );
};

export default Routers;
