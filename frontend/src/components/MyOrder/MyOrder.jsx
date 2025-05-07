import React, { useState } from 'react';

const ordersData = [
  {
    id: 1,
    status: 'Đang xử lý',
    date: '2025-04-20',
    products: [
      { name: 'Áo thun nam', quantity: 2, price: 100000 },
      { name: 'Giày thể thao', quantity: 1, price: 300000 },
    ],
    totalPrice: 500000,
  },
  {
    id: 2,
    status: 'Đã giao',
    date: '2025-04-15',
    products: [
      { name: 'Laptop Dell', quantity: 1, price: 15000000 },
    ],
    totalPrice: 15000000,
  },
  // Add more orders as needed
];

export const MyOrder = () => {
  const [orders] = useState(ordersData);

  return (
    <div className="my-order">
      <h2>Danh sách đơn hàng của tôi</h2>
      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <div className="order-header">
                <span className="order-status">{order.status}</span>
                <span className="order-date">{order.date}</span>
              </div>
              <div className="order-products">
                {order.products.map((product, index) => (
                  <div key={index} className="product">
                    <p>{product.name} x{product.quantity}</p>
                    <p>{product.price.toLocaleString()} VND</p>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <span className="order-total">
                  Tổng cộng: {order.totalPrice.toLocaleString()} VND
                </span>
                {order.status !== 'Đã giao' && (
                  <button className="btn-cancel">Hủy đơn hàng</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
