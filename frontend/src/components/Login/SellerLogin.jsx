import React, { useState } from 'react';
import './sellerlogin.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo/logo.png';
import logostruck from '../../assets/images/logo/logostruck.jpg';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';

export const SellerLogin = () => {
   const { setCustomer, setSeller } = useAppContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email';
    if (!formData.password.trim()) newErrors.password = 'Vui lòng nhập mật khẩu';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    try {
      const res = await axios.post('http://localhost:4005/api/auth/login', formData);
  

      if (res.data.user.role === 'seller') {
        navigate('/seller');
      } else {
        alert('Tài khoản của bạn chưa đăng ký'); 
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };
  
  return (
    <div className="loginSeller">
      <header className="loginSeller__header">
        <div className="loginSeller__header-box">
          <div className="loginSeller__header-logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
            <h3>Đăng nhập</h3>
          </div>
          <a href="#">Bạn cần giúp đỡ?</a>
        </div>
      </header>
      <div className="loginSeller__container">
        <div className="registerSeller__content">
          <h1 className="shopeeSeller__title">Bán hàng chuyên nghiệp</h1>
          <p>
            Quản lý shop của bạn một cách hiệu quả hơn<br /> trên Shopee với Shopee - Kênh Người bán
          </p>
          <img src={logostruck} alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <span>Đăng nhập</span>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="toggle-password" onClick={togglePassword}>
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button type="submit" className="btn-submit">
            Đăng nhập
          </button>
          <div className="loginSeller__options">
            <span>Quên mật khẩu</span>
            <span>Đăng nhập với SMS</span>
          </div>
          <div className="social-loginSeller">
            <button className="btn-facebook">
              <i className="fa-brands fa-facebook"></i>Facebook
            </button>
            <button className="btn-google">
              <i className="fa-brands fa-google"></i>Google
            </button>
          </div>
          <p className="no-account">
            Bạn mới biết đến Shopee? <Link to="/seller/register">Đăng ký</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
