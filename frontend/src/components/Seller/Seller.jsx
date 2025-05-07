import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './seller.css';

export const Seller = () => {
  return (
    <div className="seller-layout">

      <div className="seller-sidebar">
        <h2>Kênh Người Bán</h2>
        <ul>
          <li><Link to="/seller/orders">Đơn hàng</Link></li>
          <li><Link to="/seller/addProducts">Thêm sản phẩm</Link></li>
          <li><Link to="/seller/revenue">Doanh thu</Link></li>
          <li><Link to="/seller/settings">Cài đặt</Link></li>
        </ul>
      </div>

  
      <div className="seller-main">

        <div className="seller-header">
          <span>Xin chào, Seller!</span>
          <div className="seller-header-actions">
            <i className="fa fa-bell"></i>
            <img src="/avatar.jpg" alt="avatar" className="seller-avatar" />
          </div>
        </div>

        <div className="seller-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
