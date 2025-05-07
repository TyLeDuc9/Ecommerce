import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import logo from '../../assets/images/logo/logo.png';
import { useAppContext } from '../../context/AppContext';

export const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { setCustomer } = useAppContext();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.identifier.trim()) newErrors.identifier = 'Vui lòng nhập email';
    if (!formData.password.trim()) newErrors.password = 'Vui lòng nhập mật khẩu';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    try {
      const res = await axios.post('http://localhost:4005/api/auth/login', {
        email: formData.identifier,
        password: formData.password
      });
  
      if (res.data.user.role === 'customer') {

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('customer', JSON.stringify(res.data.user));
        setCustomer(res.data.user);
        navigate('/'); 
      } else {
        alert('Email đã được đăng ký');
        navigate('/login'); 
      }
  
    } catch (err) {
      alert(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };
  

  return (
    <div className='login'>
      <header className='login__header'>
        <div className='login__header-box'>
          <div className='login__header-logo'>
            <Link to="/"><img src={logo} alt="Logo" /></Link>
            <h3>Đăng nhập</h3>
          </div>
          <a href="#">Bạn cần giúp đỡ?</a>
        </div>
      </header>

      <div className='login__container'>
        <div className='login-logoleft'>
          <img src={logo} alt="Logo" />
          <p>Nền tảng thương mại điện tử hàng đầu Đông Nam Á</p>
        </div>

        <form onSubmit={handleSubmit}>
          <span>Đăng nhập</span>
          <div className='form-group'>
            <input
              type="text"
              name="identifier"
              placeholder="Email"
              value={formData.identifier}
              onChange={handleChange}
            />
            {errors.identifier && <p className="error">{errors.identifier}</p>}

            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="toggle-password" onClick={togglePassword}>
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit" className='btn-submit'>Đăng nhập</button>

          <div className='login__options'>
            <span>Quên mật khẩu</span>
            <span>Đăng nhập với SMS</span>
          </div>

          <div className="social-login">
            <button type="button" className="btn-facebook"><i className="fa-brands fa-facebook"></i> Facebook</button>
            <button type="button" className="btn-google"><i className="fa-brands fa-google"></i> Google</button>
          </div>

          <p className="no-account">
            Bạn mới biết đến Shopee? <Link to="/register">Đăng ký</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
