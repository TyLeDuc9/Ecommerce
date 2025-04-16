import React, { useRef } from 'react';
import './header.css';
import { Container, Row, Button, FormGroup } from "reactstrap";
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

export const Header = () => {

  return (
    <header className='header'>
      <section className='header__box'>
        <div className='nav__wrapper d-flex align-items-center justify-content-between'>
          <div className='header__left'>
            <ul className='header__left-menu d-flex align-items-center'>
              <li><Link to="/home">Trang chủ shopee</Link></li>
              <li><Link to="/seller">Trở thành người bán</Link></li>
              <li><Link to='/dowload'>Tải ứng dụng</Link></li>
              <li>
                <a href='#'>
                  Kết nối
                  <i className="fa-brands fa-facebook"></i>
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className='header-right'>
            <ul className='header__right-menu d-flex align-items-center'>
              <li><a href='#'><i className="fa-solid fa-bell"></i>Thông báo</a></li>
              <li><Link to='/support'><i className="fa-solid fa-question"></i>Hỗ trợ</Link></li>
              <li><Link to='/login'>Đăng ký</Link></li>
              <li><Link to='/register'>Đăng nhập</Link></li>
            </ul>
          </div>
        </div>


        <div className='header__logo-search d-flex align-items-center justify-content-between'>
          <div className='logo cursor-pointer'>
            <Link to='/home' className='text-decoration-none text-white fs-2 cursor-pointer'>
              <img src={logo} alt="Logo" />
              <span className=''>Shopee</span>
            </Link>
          </div>
          <div className='header__searh'>
            <FormGroup className="d-flex align-items-center justify-content-center position-relative" >
              <input type='text' placeholder='Shopee bao ship 0Đ' className='header__search-input' />
              <i class="fa-solid fa-magnifying-glass search-icon text-white rounded"></i>
            </FormGroup>
          </div>
          <div className='header__cart'>
            <i class="fa-solid fa-cart-shopping text-white cursor-pointer"></i>
          </div>
        </div>
      </section>
    </header>
  );
};
