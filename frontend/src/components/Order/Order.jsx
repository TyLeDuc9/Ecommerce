import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import axios from 'axios';
import './order.css';

export const Order = () => {
    return (
        <div className="payment-container">
            <div className="address-section">
                <h3>Địa chỉ nhận hàng</h3>
                <form className="address-form">
                     <input
                        type="text"
                        placeholder="Họ và tên"
                        name="name"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Phone"
                        name="phone"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Tỉnh / Thành phố"
                        name="province"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Địa chỉ chi tiết"
                        name="address"
                        required
                    />
                </form>
            </div>

            <div className="payment-method-section">
                <h3>Phương thức thanh toán</h3>
                 <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"

                        />
                        Thanh toán khi nhận hàng (COD)
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="bank"
                        />
                        Thanh toán qua ngân hàng
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="credit"
                        />
                        Thanh toán bằng thẻ tín dụng
                    </label>
            </div>
            <div className='product-status'>
                <h3>Trạng thái</h3>
                <span>Pending</span>
            </div>

            <div className="product-summary">
                <h3>Sản phẩm</h3>

                    return (
                        <div className="summary-item">
                            <img
                                src=""
                                alt=""
                            />
                            <div>
                                <p></p>
                                <p>Số lượng: </p>
                                <p>Giá: đ</p>
                            </div>
                        </div>
                    );
    
            </div>

            <div className="payment-summary">
                <h3>Tổng thanh toán</h3>
                <p>đ</p>
                <button className="btn-confirm" >
                    Đặt hàng
                </button>
            </div>
        </div>
    );
};
