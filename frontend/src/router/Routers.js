import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Register } from '../components/Register/Register';
import { Login } from '../components/Login/Login';
import { SellerRegister } from '../components/Register/SellerRegister';
import { SellerLogin } from '../components/Login/SellerLogin';
import { Header } from '../components/Header/Header';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<><Header /><Home /></>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/seller/register" element={<SellerRegister />} />
      <Route path="/seller/login" element={<SellerLogin />} />
    </Routes>
  );
};

export default Routers;
// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { Home } from '../pages/Home';
// import { Register } from '../components/Register/Register';
// import { Login } from '../components/Login/Login';
// import { SellerRegister } from '../components/Register/SellerRegister';
// import { SellerLogin } from '../components/Login/SellerLogin';
// import { Header } from '../components/Header/Header';

// const Routers = () => {
//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Navigate to="/home" />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/seller/register" element={<SellerRegister />} />
//         <Route path="/seller/login" element={<SellerLogin />} />
//       </Routes></>
//   );
// };

// export default Routers;