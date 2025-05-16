import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './orderAdmin.css';
import { useAppContext } from '../../context/AppContext';

export const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAppContext();

  const fetchOrders = async () => {
    const orderRes = await axios.get('http://localhost:4000/api/order/all', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(orderRes.data);
  };

  const fetchOrderDetails = async () => {
    const detailsRes = await axios.get('http://localhost:4001/api/orderDetails/all', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrderDetails(detailsRes.data);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchOrders();
        await fetchOrderDetails();
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getDetailsForOrder = (orderId) => {
    const details = orderDetails.filter(od => od.orderId?._id === orderId);
    console.log('Order:', orderId, 'Details:', details);
    return details;
  };


  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="order-admin">
      <h2>Danh sách tất cả đơn hàng</h2>
      <table>
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Phương thức thanh toán</th>
            <th>Vận chuyển</th>
            <th>Phí ship</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <React.Fragment key={order._id}>
              <tr>
                <td>{order._id}</td>
                <td>{order.userId?.name || 'Không có'}</td>
                <td>{order.totalOrder.toLocaleString()} VND</td>
                <td>{order.status}</td>
                <td>{order.paymentId?.paymentMethod || 'Không có'}</td>
                <td>{order.transportId?.shippingCarrier || 'Không có'}</td>
                <td>{order.transportId?.fee || 'Không có'} VND</td>
                <td>
                  <ul>
                    {getDetailsForOrder(order._id).map(detail => (
                      <li key={detail._id} style={{ marginBottom: '8px' }}>
                        <img src={detail.productId?.image[0]} alt="san pham" style={{ width: '40px', marginRight: '8px' }} />
                        <span>{detail.productId?.name}</span> -
                        <span> SL: {detail.quantity}</span> -
                        <span> Giá: {detail.totalPrice.toLocaleString()} VND</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
