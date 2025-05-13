import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './seller.css';
import { useAppContext } from '../../context/AppContext';
export const Seller = () => {
  const { seller } = useAppContext(); 

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
          <span>Xin chào, {seller?.name || 'Seller'}!</span>
          <div className="seller-header-actions">
            <i className="fa fa-bell"></i>
            <span className="seller-name">{seller?.name}</span> 
          </div>
        </div>

        <div className="seller-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};