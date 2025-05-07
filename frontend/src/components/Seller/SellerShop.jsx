import React from 'react';
import './sellershop.css';

export const SellerShop = () => {
  return (
    <div className="shop-header">
      <div className="shop-info-left">
        <img
          className="shop-avatar"
          src="https://i.pinimg.com/736x/2d/88/1d/2d881d9e8f0d5259f150ffb8cb6af9e8.jpg"
          alt="Shop Avatar"
        />
        <div className="shop-details">
          <h2 className="shop-name">Clothes Shop</h2>
          <p className="shop-online">Online 8 Phút Trước</p>
          <div className="shop-buttons">
            <button className="view-btn">🏪 Xem Shop</button>
          </div>
        </div>
      </div>

      <div className="shop-info-right">
        <div className="shop-stat">
          <p className="stat-title">Đánh Giá</p>
          <p className="stat-value">199,8k</p>
        </div>
        <div className="shop-stat">
          <p className="stat-title">Tỉ Lệ Phản Hồi</p>
          <p className="stat-value">88%</p>
        </div>
        <div className="shop-stat">
          <p className="stat-title">Tham Gia</p>
          <p className="stat-value">9 năm trước</p>
        </div>
        <div className="shop-stat">
          <p className="stat-title">Sản Phẩm</p>
          <p className="stat-value">9,3k</p>
        </div>
        <div className="shop-stat">
          <p className="stat-title">Thời Gian Phản Hồi</p>
          <p className="stat-value">trong vài giờ</p>
        </div>
        <div className="shop-stat">
          <p className="stat-title">Người Theo Dõi</p>
          <p className="stat-value">190,5k</p>
        </div>
      </div>
    </div>
  );
};
