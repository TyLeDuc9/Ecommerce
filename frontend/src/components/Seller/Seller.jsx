import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './seller.css';
import { useAppContext } from '../../context/AppContext';

export const Seller = () => {
  const { seller, handleSellerLogout, handleSellerLogin } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    handleSellerLogout();
    navigate('/login');
  };

  return (
    <div className="seller-layout">
      <div className="seller-sidebar">
        <h2>Kênh Người Bán</h2>
        <ul>
          <li><Link to="/seller/orderSeller">Đơn hàng</Link></li>
          <li><Link to="/seller/addProducts">Thêm sản phẩm</Link></li>
          <li><Link to="/seller/revenue">Doanh thu</Link></li>
          <li><Link to="/seller/settings">Cài đặt</Link></li>
        </ul>
      </div>

      <div className="seller-main">
        <div className="seller-header">
          <span onClick={() => navigate('/seller/sellerForm')} style={{ cursor: 'pointer' }}>
            <i className="fa fa-user"></i> Xin chào, {seller?.name || 'Seller'}!
          </span>
          <div className="seller-header-actions">
            <i className="fa fa-bell"></i>
            <span className="seller-name">{seller?.name}</span>
            <button className="logout-btn" onClick={handleLogout}>
              <i className="fa fa-sign-out-alt"></i> Đăng xuất
            </button>
          </div>
        </div>

        <div className="seller-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
