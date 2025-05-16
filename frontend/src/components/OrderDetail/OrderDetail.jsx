import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      const res = await axios.get(`http://localhost:4001/api/orderDetails/${id}`);
      setOrder(res.data);
    };
    fetchOrderDetail();
  }, [id]);

  if (!order) return <p>Đang tải chi tiết đơn hàng...</p>;

  return (
    <div>
      <h2>Chi tiết đơn hàng {order._id}</h2>
      <p><strong>Khách hàng:</strong> {order.customerId?.name}</p>
      <p><strong>Tổng tiền:</strong> {order.totalOrder.toLocaleString()}₫</p>
      <p><strong>Trạng thái:</strong> {order.status}</p>
      {/* Có thể thêm chi tiết sản phẩm trong đơn nếu bạn kết hợp với OrderDetails */}
    </div>
  );
};

export default OrderDetail;
