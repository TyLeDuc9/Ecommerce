import React from 'react';
import './payment.css';
import { useAppContext } from '../../context/AppContext';

export const Payment = () => {
    const { cartItems, product } = useAppContext();

    const selectedItems = cartItems.filter(item => item.selected);

    const getProductById = (id) => product.find((p) => p.id === id);

    const totalPrice = selectedItems.reduce((acc, item) => {
        const prod = getProductById(item.productId);
        if (!prod) return acc;
        return acc + prod.discounted_price * item.quantity;
    }, 0);

    return (
        <div className="payment-container">
            <h2>Thanh toán</h2>
            <div className="address-section">
                <h3>Địa chỉ nhận hàng</h3>
                <form className="address-form">
                    <input type="text" placeholder="Họ và tên" required />
                    <input type="text" placeholder="Số điện thoại" required />
                    <input type="text" placeholder="Tỉnh / Thành phố" required />
                    <input type="text" placeholder="Quận / Huyện / Phường / Xã" required />
                    <input type="text" placeholder="Địa chỉ chi tiết" required />
                </form>
            </div>

            <div className="product-summary">
                <h3>Sản phẩm</h3>
                {selectedItems.map((item, index) => {
                    const prod = getProductById(item.productId);
                    if (!prod) return null;
                    return (
                        <div className="summary-item" key={index}>
                            <img src={prod.img[0]} alt={prod.name} />
                            <div>
                                <p>{prod.name}</p>
                                <p>Số lượng: {item.quantity}</p>
                                <p>Giá: đ{(prod.discounted_price * item.quantity).toLocaleString('vi-VN')}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="payment-summary">
                <h3>Tổng thanh toán</h3>
                <p>đ{totalPrice.toLocaleString('vi-VN')}</p>
                <button className="btn-confirm">Đặt hàng</button>
            </div>
        </div>
    );
};
