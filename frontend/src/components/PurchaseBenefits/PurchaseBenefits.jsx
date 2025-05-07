import React from 'react';
import './purchaseBenefits.css';

export const PurchaseBenefits = () => {
    return (
        <div className="purchase-benefits">
            <ul className="benefits-summary">
                <li>
                    <i className="fa-solid fa-shield-halved icon-red" />
                    Trả hàng miễn phí 15 ngày
                </li>

                <li>Chính hãng 100%</li>

                <li className="hover-trigger">
                    Miễn phí vận chuyển
                    <i className="fa-solid fa-chevron-down icon-arrow" />

                    <div className="benefits-details">
                        <h4>An tâm mua sắm cùng Shopee</h4>
                        <ul>
                            <li>
                                <i className="fa-solid fa-rotate-left icon-red" />
                                <div>
                                    <strong>Trả hàng miễn phí 15 ngày:</strong> Miễn phí Trả hàng trong 15 ngày để đảm bảo bạn hoàn toàn có thể yên tâm khi mua hàng ở Shopee.
                                    Ngoài ra, tại thời điểm nhận hàng, bạn có thể đồng kiểm và được trả hàng miễn phí.
                                </div>
                            </li>
                            <li>
                                <i className="fa-solid fa-shield-halved icon-red"></i>
                                <div>
                                    <strong>Chính hãng 100%:</strong> Nhận lại gấp đôi số tiền mà bạn đã thanh toán cho sản phẩm không chính hãng từ Shopee Mall.
                                </div>
                            </li>
                            <li>
                                <i className="fa-solid fa-truck-fast icon-red" />
                                <div>
                                    <strong>Miễn phí vận chuyển:</strong> Ưu đãi miễn phí vận chuyển lên tới 40,000 VNĐ cho đơn hàng của Shopee Mall từ 150,000 VNĐ.
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
};
