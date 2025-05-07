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
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import { Cart } from '../components/Cart/Cart';
import { Payment } from '../components/Payment/Payment';
import { Seller } from '../components/Seller/Seller';
import { AddProducts } from '../components/Seller/AddProducts';
import { Order } from '../components/Order/Order';
import { MyOrder } from '../components/MyOrder/MyOrder';
import { Support } from '../components/Support/Support';

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
        <Route path="/product/:category" element={<><Header/><ProductCategory /></>} />
        <Route path="/product/:category/:id" element={<><Header/><ProductDetails /></>} />
        <Route path="/cart" element={<><Header/><Cart/></>} />
        <Route path="/payment" element={<><Header/><Payment/></>} />
        <Route path="/seller" element={<Seller/>} />
        <Route path="/seller/addProducts" element={<><Header /><AddProducts /></>} />
        <Route path="/order" element={<><Header /><Order/></>} />
        <Route path="/myOrder" element={<><Header /><MyOrder/></>} />
        <Route path="/support" element={<><Support/></>} />

      </Routes>
      <Footer />
      </>
  );
};

export default Routers;
