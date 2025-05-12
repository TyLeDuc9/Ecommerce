import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import axios from 'axios';
import './order.css';
import { Link, useNavigate } from 'react-router-dom';
export const Order = () => {
  const { user } = useAppContext();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    province: '',
    address: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transportMethod, setTransportMethod] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const transportCosts = {
    GHN: 35000,
    GHTK: 30000,
    ViettelPost: 25000,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:3003/api/cart/user/${user.id}`);
        setCartItems(res.data);
        const total = res.data.reduce(
          (total, item) => total + item.quantity * item.productId.price, 0
        );
        setTotalAmount(total);
      } catch (error) {
        console.error('Lỗi khi lấy giỏ hàng:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchCart();
    }
  }, [user]);
  const updateTotalAmount = (newTransportMethod) => {
    const transportCost = transportCosts[newTransportMethod] || 0;
    const newTotalAmount = cartItems.reduce(
      (total, item) => total + item.quantity * item.productId.price, 0
    ) + transportCost;
    setTotalAmount(newTotalAmount);
  };

  const handleTransportChange = (e) => {
    setTransportMethod(e.target.value);
    updateTotalAmount(e.target.value);
  };
  const handleOrderSubmit = async () => {
    try {
      const paymentRes =  await axios.get(`http://localhost:3007/api/payment/method/${paymentMethod}`);
      const paymentData = Array.isArray(paymentRes.data) ? paymentRes.data[0] : paymentRes.data;
      const transportRes = await axios.get(`http://localhost:3005/api/transport/method/${transportMethod}`);
      const transportData = Array.isArray(transportRes.data) ? transportRes.data[0] : transportRes.data;
      if (!paymentData?._id || !transportData?._id) {
        alert('Không tìm thấy phương thức thanh toán hoặc vận chuyển hợp lệ');
        return;
      }
      const orderData = {
        totalOrder: totalAmount,
        customerId: user.id,
        paymentId: paymentData._id,
        shippingInfo,
        transportId: transportData._id,
        status: 'pending',
        userId: user.id,

      };
      const orderRes = await axios.post('http://localhost:4000/api/order/create', orderData);
      console.log("Phản hồi từ API tạo đơn hàng:", orderRes.data);
      const order = orderRes.data.order;
      const orderId = order._id;

      if (!orderId) {
        alert('Không tìm thấy ID đơn hàng.');
        return;
      }

      for (const item of cartItems) {
        const orderDetailsData = {
          orderId: orderId,
          productId: item.productId._id,
          quantity: item.quantity,
          totalPrice: item.quantity * item.productId.price,
        };
        console.log("Dữ liệu chi tiết đơn hàng:", orderDetailsData);

        await axios.post('http://localhost:4001/api/orderDetails/create', orderDetailsData);
      }

      alert('Đặt hàng thành công!');
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
      if (error.response) {
        alert(`Lỗi: ${error.response.data.message || 'Có lỗi xảy ra, vui lòng thử lại!'}`);

      } else {
        alert('Đặt hàng không thành công, vui lòng kiểm tra kết nối.');
      }
    }
  };
  return (
    <div className="payment-container">
      <div className="address-section">
        <h3>Địa chỉ nhận hàng</h3>
        <form className="address-form">
          <input
            type="text"
            placeholder="Họ và tên"
            name="name"
            value={shippingInfo.name}
            onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Phone"
            name="phone"
            value={shippingInfo.phone}
            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Tỉnh / Thành phố"
            name="province"
            value={shippingInfo.province}
            onChange={(e) => setShippingInfo({ ...shippingInfo, province: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Địa chỉ chi tiết"
            name="address"
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
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
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Thanh toán khi nhận hàng (COD)
        </label>
      </div>

      <div className="transport-method">
        <label>
          <input
            type="radio"
            name="transportMethod"
            value="GHN"
            onChange={handleTransportChange}
          />
          GHN: 35000 Đ
        </label>
        <label>
          <input
            type="radio"
            name="transportMethod"
            value="GHTK"
            onChange={handleTransportChange}
          />
          GHTK: 30000 Đ
        </label>
        <label>
          <input
            type="radio"
            name="transportMethod"
            value="ViettelPost"
            onChange={handleTransportChange}
          />
          Viettel Post: 25000 Đ
        </label>
      </div>

      <div className="product-summary">
        <h3>Sản phẩm</h3>
        {loading ? (
          <p>Đang tải...</p>
        ) : cartItems.length === 0 ? (
          <p>Giỏ hàng trống</p>
        ) : (
          cartItems.map((item) => (
            <div className="summary-item" key={item._id}>
              <img src={item.productId.image[0]} alt={item.productId.name} />
              <div>
                <p>{item.productId.name}</p>
                <p>Số lượng: {item.quantity}</p>
                <p>Giá: {item.productId.price.toLocaleString()} đ</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="payment-summary">
        <h3>Tổng thanh toán</h3>
        <p>{totalAmount.toLocaleString()} đ</p>
        <button className="btn-confirm" onClick={handleOrderSubmit}>Đặt hàng</button>
      </div>
    </div>
  );
};
