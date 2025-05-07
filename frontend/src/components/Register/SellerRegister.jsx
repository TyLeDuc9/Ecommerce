import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo/logo.png';
import './sellerRegister.css';
import axios from 'axios';

export const SellerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller'
  });

  const navigate = useNavigate();
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Email không hợp lệ');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4005/api/auth/register', formData);
      alert('Đăng ký thành công');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className='registerSeller'>
      <header className='registerSeller__header'>
        <div className='registerSeller__header-box'>
          <div className='registerSeller__header-logo'>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
            <h3>Đăng ký</h3>
          </div>
          <a href="#">Bạn cần giúp đỡ?</a>
        </div>
      </header>

      <div className='registerSeller__container'>
        <div className='registerSeller__content'>
          <h1 className="shopee-seller__title">Shopee Việt Nam</h1>
          <h2 className="shopee-seller__subtitle">Trở thành Người bán<br />ngay hôm nay</h2>
          <ul>
            <li><i className="fa-solid fa-store"></i>Nền tảng thương mại điện tử hàng đầu Đông Nam Á </li>
            <li><i className="fa-solid fa-gift"></i>Phát triển trở thành thương hiệu toàn cầu</li>
            <li><i className="fa-solid fa-handshake"></i>Dẫn đầu lượng người dùng trên ứng dụng mua sắm tại Việt Nam</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <span>Đăng ký</span>
          <div className='form-group'>
            <input type="text" name="name" placeholder="Họ và tên" onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
          </div>
          <button type="submit" className='btn-submit'>Đăng Ký</button>

          <div className="social-login">
            <button type="button" className="btn-facebook"><i className="fa-brands fa-facebook"></i> Facebook</button>
            <button type="button" className="btn-google"><i className="fa-brands fa-google"></i> Google</button>
          </div>
          <p className="terms">
            Bằng việc đăng kí, bạn đã đồng ý với <Link to="/terms">Shopee về Điều khoản sử dụng</Link> &amp;
            <Link to="/privacy-policy"> Chính sách bảo mật</Link>
          </p>
          <p className="already-account">
            Bạn đã có tài khoản? <NavLink to="/seller/login">Đăng nhập</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};
