import React from 'react'
import logo from '../../assets/images/logo/logo.png';
import { NavLink, Link } from 'react-router-dom';
import './sellerRegister.css'
export const SellerRegister = () => {
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
                    <h1 class="shopee-seller__title">Shopee Việt Nam</h1>
                    <h2 class="shopee-seller__subtitle">Trở thành Người bán<br/>ngay hôm nay</h2>
                    <ul>
                        <li><i class="fa-solid fa-store"></i>Nền tảng thương mại điện tử hàng đầu Đông Nam Á </li>
                        <li><i class="fa-solid fa-gift"></i>Phát triển trở thành thương hiệu toàn cầu</li>
                        <li><i class="fa-solid fa-handshake"></i>Dẫn đầu lượng người dùng trên ứng dụng mua sắm tại Việt Nam</li>
                    </ul>
                </div>

                <form>
                    <span>Đăng ký</span>
                    <div className='form-group'>
                        <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Số điện thoại" />
                    </div>
                    <button type="submit" className='btn-submit'>Tiếp theo</button>
                    <div className="social-login">
                        <button className="btn-facebook"><i class="fa-brands fa-facebook"></i>Facebook</button>
                        <button className="btn-google"><i class="fa-brands fa-google"></i>Google</button>
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
    )
}
