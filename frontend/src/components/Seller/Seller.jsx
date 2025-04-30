import React from 'react';
import './seller.css';

export const Seller = () => {
  return (
    <div className="seller-container">
      <aside className="seller-sidebar">
        <h2>Seller Center</h2>
        <ul>
          <li>Dashboard</li>
          <li>Quản lý sản phẩm</li>
          <li>Đơn hàng</li>
          <li>Doanh thu</li>
          <li>Thiết lập cửa hàng</li>
        </ul>
      </aside>

      <main className="seller-main">
        <h1>Chào mừng đến với Kênh Người Bán</h1>
        <p>Hãy bắt đầu quản lý cửa hàng và đơn hàng của bạn tại đây.</p>

        <div className="seller-stats">
          <div className="stat-card">
            <h3>Sản phẩm</h3>
            <p>12</p>
          </div>
          <div className="stat-card">
            <h3>Đơn hàng hôm nay</h3>
            <p>5</p>
          </div>
          <div className="stat-card">
            <h3>Doanh thu hôm nay</h3>
            <p>₫1.200.000</p>
          </div>
        </div>
      </main>
    </div>
  );
};
