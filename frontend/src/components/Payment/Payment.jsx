import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import './payment.css';
import { useAppContext } from '../../context/AppContext';

export const Payment = () => {
    const { cartItems, product } = useAppContext();
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const selectedItems = cartItems.filter(item => item.selected);
    const getProductById = (id) => product.find((p) => p.id === id);

    const totalPrice = selectedItems.reduce((acc, item) => {
        const prod = getProductById(item.productId);
        if (!prod) return acc;
        return acc + prod.discounted_price * item.quantity;
    }, 0);

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <div className="payment-container">

            <div className="address-section">
                <h3>Địa chỉ nhận hàng</h3>
                <form className="address-form">
                    <input type="text" placeholder="Họ và tên" required />
                    <input type="text" placeholder="Số điện thoại" required />
                    <input type="text" placeholder="Tỉnh / Thành phố" required />
                    <input type="text" placeholder="Địa chỉ chi tiết" required />
                </form>
            </div>

            <div className="payment-method-section">
                <h3>Phương thức thanh toán</h3>
                <div className="payment-options">
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={paymentMethod === 'cod'}
                            onChange={handlePaymentChange}
                        />
                        Thanh toán khi nhận hàng (COD)
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="bank"
                            checked={paymentMethod === 'bank'}
                            onChange={handlePaymentChange}
                        />
                        Chuyển khoản ngân hàng
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="credit"
                            checked={paymentMethod === 'credit'}
                            onChange={handlePaymentChange}
                        />
                        Thẻ tín dụng / Ghi nợ
                    </label>
                </div>
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
                <Link to="/order">
                    <button className="btn-confirm">Đặt hàng</button>
                </Link>
            </div>
        </div>
    );
};
