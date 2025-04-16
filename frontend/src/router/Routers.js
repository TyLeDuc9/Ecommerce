import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {Home} from '../pages/Home';
import {Login} from '../pages/Login';
import {Seller} from '../pages/Seller';
import {Support} from '../pages/Support'
import {Register} from '../pages/Register';
import { Dowload } from '../pages/Dowload';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dowload" element={<Dowload />} />
      <Route path="/seller" element={<Seller />} />
      <Route path="/support" element={<Support />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routers;
