import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './login.css';
import logo from '../../assets/images/logo/logo.png';
import useTogglePassword from '../../hooks/useTogglePassword'
export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className='login'>
            <header className='login__header'>
                <div className='login__header-box'>
                    <div className='login__header-logo'>
                        <Link to="/">
                            <img src={logo} alt="Logo" />
                        </Link>
                        <h3>Đăng nhập</h3>
                    </div>
                    <a href="#">Bạn cần giúp đỡ?</a>
                </div>
            </header>
            <div className='login__container'>
                <div className='login-logoleft'>
                    <img src={logo} alt="Logo" />
                    <p>Nền tảng thương mại điển tử hàng đầu Đông Nam Á</p>
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
                    <div className='login__options'>
                        <span>Quên mật khẩu</span>
                        <span>Đăng nhập với SMS</span>
                    </div>
                    <div className="social-login">
                        <button className="btn-facebook"><i className="fa-brands fa-facebook"></i>Facebook</button>
                        <button className="btn-google"><i className="fa-brands fa-google"></i>Google</button>
                    </div>
                    <p className="no-account">
                        Bạn mới biết đến Shopee? <Link to="/register">Đăng ký</Link>
                    </p>
                </form>
            </div>

        </div>

    )
}
