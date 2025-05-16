import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './sellershop.css';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export const SellerShop = ({ productId }) => {
  const [shopInfo, setShopInfo] = useState(null);
  const navigate = useNavigate();
  const handleViewShop = () => {
    navigate(`/shop/${shopInfo.sellerId._id}`);
  };
  useEffect(() => {
    console.log('Received productId:', productId);

    const fetchSellerInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:4003/api/product/seller/${productId}`);
        setShopInfo(response.data);
      } catch (error) {
        console.error('Error fetching shop info:', error);
      }
    };

    if (productId) {
      fetchSellerInfo();
    }
  }, [productId]);
  if (!shopInfo) return <div>Loading...</div>;



  return (
    <div className="shop-header">
      <div className="shop-info-left">
        <img
          className="shop-avatar"
          src={shopInfo.sellerId.image[0] || 'default-avatar.png'}
          alt="Shop Avatar"
        />
        <div className="shop-details">
          <h2 className="shop-name">{shopInfo.sellerId.storeName}</h2>
          <p className="shop-online">Online: 7 minutes ago</p>
          <div className="shop-buttons">
            <button className="view-btn" onClick={handleViewShop}>🏪 Xem Shop</button>
          </div>
        </div>
      </div>

      <div className="shop-info-right">
        <div className="shop-stat">
          <p className="stat-title">Địa chỉ: {shopInfo.sellerId.storeAddress}</p>
          <p className="stat-title">Số điện thoại: {shopInfo.sellerId.phone}</p>
        </div>
      </div>
      <div className="seller-content">
        <Outlet />
      </div>
    </div>
  );
};
