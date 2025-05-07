import React from 'react';
import './order.css';
import { useAppContext } from '../../context/AppContext';

export const Order = () => {
    const { cartItems, product } = useAppContext();
    

    
    const orderedItems = cartItems.filter(item => item.ordered); 
    const getProductById = (id) => product.find((p) => p.id === id);

    return (
        <div className="order-container">
            <h2>Đơn hàng của bạn</h2>

            {orderedItems.length === 0 ? (
                <p>Hiện chưa có đơn hàng nào.</p>
            ) : (
                orderedItems.map((item, index) => {
                    const prod = getProductById(item.productId);
                    if (!prod) return null;
                    return (
                        <div className="order-item" key={index}>
                            <div className="order-header">
                                <span>Mã đơn: #{item.id}</span>
                                <span className="order-status">Đã đặt hàng</span>
                            </div>
                            <div className="order-body">
                                <img src={prod.img[0]} alt={prod.name} />
                                <div className="order-info">
                                    <p className="product-name">{prod.name}</p>
                                    <p>Số lượng: {item.quantity}</p>
                                    <p>Giá: đ{(prod.discounted_price * item.quantity).toLocaleString('vi-VN')}</p>
                                </div>
                            </div>
                            <div className="order-footer">
                                <span>Tổng tiền: <strong>đ{(prod.discounted_price * item.quantity).toLocaleString('vi-VN')}</strong></span>
                                <div className="order-actions">
                                    <button className="btn-outline">Mua lại</button>
                                    <button className="btn-orange">Xem chi tiết</button>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};
