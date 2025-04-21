import React from 'react';
import { Col, Row } from 'antd';
import { NavLink, Link } from 'react-router-dom';
import './header.css';
import logo from '../../assets/images/logo/logo.png';

export const Header = () => {
  console.log("Header loaded");
  return (
    <header className='header'>
      <Row className='header__top' justify="space-between">
        <Col>
          <ul className='header__top-left d-flex align-items-center'>
            <li><Link to="/home">Trang chủ Shopee</Link></li>
            <li><Link to="/seller/register">Trở thành Người bán</Link></li>
            <li><Link to="/download">Tải ứng dụng</Link></li>
            <li>
              <span>Kết nối</span>
              <a href="#"><i className="fa-brands fa-facebook"></i></a>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
            </li>
          </ul>
        </Col>
        <Col>
          <ul className='header__top-right d-flex align-items-center'>
            <li><a href="#"><i className="fa-solid fa-bell"></i> Thông báo</a></li>
            <li><Link to="/support"><i className="fa-solid fa-question"></i> Hỗ trợ</Link></li>
            <li><Link to="/register">Đăng ký</Link></li>
            <li><Link to="/login">Đăng nhập</Link></li>
          </ul>
        </Col>
      </Row>
      <Row className='header__main' align="middle" justify="space-between">
        <Col span={4} className='logo'>
          <Link to="/home">
            <img src={logo} alt="Shopee Logo" className="header__logo" />
          </Link>
        </Col>
        <Col span={16}>
          <div className="header__search">
            <input type="text" placeholder="Tìm sản phẩm, thương hiệu và tên shop" />
            <button><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </Col>
        <Col span={4} className="header__cart">
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <span className="cart-count">0</span>
          </Link>
        </Col>
      </Row>
    </header>
  );
};
