import React, { useState } from 'react';
import logo from '../../assets/images/logo/logo.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

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
    <div className='register'>
      <header className='register__header'>
        <div className='register__header-box'>
          <div className='register__header-logo'>
            <Link to="/"><img src={logo} alt="Logo" /></Link>
            <h3>Đăng ký</h3>
          </div>
          <a href="#">Bạn cần giúp đỡ?</a>
        </div>
      </header>

      <div className='register__container'>
        <div className='register-logoleft'>
          <img src={logo} alt="Logo" />
          <p>Nền tảng thương mại điện tử hàng đầu Đông Nam Á</p>
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
          <button type="submit" className='btn-submit'>Đăng ký</button>
          <div className="social-login">
            <button type="button" className="btn-facebook"><i className="fa-brands fa-facebook"></i> Facebook</button>
            <button type="button" className="btn-google"><i className="fa-brands fa-google"></i> Google</button>
          </div>
          <p className="terms">
            Bằng việc đăng ký, bạn đã đồng ý với <Link to="/terms">Shopee về Điều khoản sử dụng</Link> &amp;
            <Link to="/privacy-policy"> Chính sách bảo mật</Link>
          </p>
          <p className="already-account">
            Bạn đã có tài khoản? <NavLink to="/login">Đăng nhập</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};