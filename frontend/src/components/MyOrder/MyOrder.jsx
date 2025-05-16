<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import './myorder.css';

export const MyOrder = () => {
  const { user } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        setOrders([]);           
        setOrderDetails({});     
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/api/order/user/${user.id}`);
        setOrders(res.data);
      } catch (error) {
        console.error('❌ Lỗi khi lấy danh sách đơn hàng:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchMyOrders();
    }
  }, [user]);

  // useEffect(() => {
  //   const fetchMyOrders = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:4000/api/order/user/${user.id}`);
  //       setOrders(res.data);
  //       console.log('✅ orders:', res.data);
  //     } catch (error) {
  //       console.error('❌ Lỗi khi lấy danh sách đơn hàng:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (user?.id) {
  //     setOrders([]);
  //     setOrderDetails({});
  //     fetchMyOrders();
  //   }
  // }, [user]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const details = {};
        for (const order of orders) {
          const res = await axios.get(`http://localhost:4001/api/orderDetails/order/${order._id}`);
          console.log(`📦 Chi tiết đơn hàng ${order._id}:`, res.data);
          details[order._id] = res.data;
        }
        setOrderDetails(details);
      } catch (error) {
        console.error('❌ Lỗi khi lấy chi tiết đơn hàng:', error);
      }
    };

    if (orders.length > 0) {
      fetchOrderDetails();
    }
  }, [orders]);

  if (loading) return <div className="my-order"><p>Đang tải đơn hàng...</p></div>;

  if (orders.length === 0) {
    return <div className="my-noOrder"><p>Bạn chưa có đơn hàng nào.</p></div>;
  }

  return (
    <div className="my-order">
      <h2>Đơn hàng của bạn</h2>
      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-header">
            <p><strong>Mã đơn hàng:</strong> {order._id}</p>
            <p><strong>Ngày đặt:</strong> {new Date(order.createdAt).toLocaleDateString()} </p>
            <p><strong>Trạng thái:</strong> {order.status}</p>
            <p><strong>Tên khách hàng:</strong> {order.shippingInfo?.name}</p>
            <p><strong>Địa chỉ:</strong> {order.shippingInfo?.province} {order.shippingInfo?.address}</p>
          </div>
          <div className="order-products">
            {orderDetails[order._id]?.map((detail) => (
              <div className="order-product" key={detail._id}>
                <img
                  src={detail?.productId?.image[1]}  // Lấy hình ảnh đầu tiên từ mảng image
                  alt={detail?.productId?.name || 'Sản phẩm không có ảnh'}
                />
                <div className="product-info">
                  <p>{detail?.productId?.name}</p>
                  <p>Số lượng: {detail.quantity}</p>
                  <p>Giá: {(detail.totalPrice).toLocaleString()} đ</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <p><strong>Phí ship</strong> {order.transportId?.fee?.toLocaleString() || 0} đ</p>
            <p><strong>Tổng tiền:</strong> {order.totalOrder.toLocaleString()} đ</p>
          </div>
        </div>
      ))}
=======
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
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
    </div>
  );
};
