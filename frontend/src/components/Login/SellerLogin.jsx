import React, { useState } from 'react'
import './sellerlogin.css'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo/logo.png';
import useTogglePassword from '../../hooks/useTogglePassword'
import logostruck from '../../assets/images/logo/logostruck.jpg'
export const SellerLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className='loginSeller'>
      <header className='loginSeller__header'>
        <div className='loginSeller__header-box'>
          <div className='loginSeller__header-logo'>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
            <h3>Đăng nhập</h3>
          </div>
          <a href="#">Bạn cần giúp đỡ?</a>
        </div>
      </header>
      <div className='loginSeller__container'>
        <div className='registerSeller__content'>
          <h1 class="shopeeSeller__title">Bán hàng chuyên nghiệp</h1>
          <p>Quản lý shop của bạn một cách hiệu quả hơn<br /> trên Shopee với Shopee - Kênh Người bán</p>
          <img src={logostruck} />
        </div>

        <form>
          <span>Đăng nhập</span>
          <div className='form-group'>
            <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Số điện thoại/Email/Tên đăng nhập" />
            <div className="password-input-wrapper">
              <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Mật khẩu" />
              <span className="toggle-password" onClick={togglePassword}>
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
          </div>
          <button type="submit" className='btn-submit'>Đăng nhập</button>
          <div className='loginSeller__options'>
            <span>Quên mật khẩu</span>
            <span>Đăng nhập với SMS</span>
          </div>
          <div className="social-loginSeller">
            <button className="btn-facebook"><i class="fa-brands fa-facebook"></i>Facebook</button>
            <button className="btn-google"><i class="fa-brands fa-google"></i>Google</button>
          </div>
          <p className="no-account">
            Bạn mới biết đến Shopee? <Link to="/seller/register">Đăng ký</Link>
          </p>
        </form>
      </div>

    </div>
  )
}
