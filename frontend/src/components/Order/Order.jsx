<<<<<<< HEAD

=======
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import axios from 'axios';
import './order.css';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';

export const Order = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
=======
import { Link, useNavigate } from 'react-router-dom';
export const Order = () => {
  const { user } = useAppContext();
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
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
<<<<<<< HEAD
    GHTK: 25000,
    ViettelPost: 30000,
  };

  // Lấy giỏ hàng thật từ backend
  useEffect(() => {
    if (!user?.id) {
      setCartItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    axios.get(`http://localhost:3003/api/cart/user/${user.id}`)
      .then((res) => {
        const cart = res.data;
        const items = cart.items || [];
        setCartItems(items);

        // Tính tổng tiền sản phẩm (chưa bao gồm phí vận chuyển)
        const productTotal = items.reduce(
          (sum, item) => sum + item.quantity * item.productId.price,
          0
        );
        setTotalAmount(productTotal);
      })
      .catch((err) => {
        console.error('Lỗi lấy giỏ hàng:', err);
        setCartItems([]);
        setTotalAmount(0);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  // Cập nhật tổng tiền khi chọn đơn vị vận chuyển
  const updateTotalAmount = (method) => {
    const cost = transportCosts[method] || 0;
    const productTotal = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.productId.price,
      0
    );
    setTotalAmount(productTotal + cost);
=======
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
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
  };

  const handleTransportChange = (e) => {
    setTransportMethod(e.target.value);
    updateTotalAmount(e.target.value);
  };
<<<<<<< HEAD


  const handleOrderSubmit = async () => {
  if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.province || !shippingInfo.address) {
    alert('Vui lòng điền đầy đủ thông tin địa chỉ nhận hàng.');
    return;
  }
  if (!paymentMethod) {
    alert('Vui lòng chọn phương thức thanh toán.');
    return;
  }
  if (!transportMethod) {
    alert('Vui lòng chọn đơn vị vận chuyển.');
    return;
  }
  if (cartItems.length === 0) {
    alert('Giỏ hàng đang trống.');
    return;
  }

  try {
    // Lấy paymentId
    const paymentRes = await axios.get(`http://localhost:3007/api/payment/method/${paymentMethod}`);
    const paymentData = Array.isArray(paymentRes.data) ? paymentRes.data[0] : paymentRes.data;

    // Lấy transportId
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
    console.log('Gửi orderData:', orderData);

    const orderRes = await axios.post('http://localhost:4000/api/order/create', orderData);
    console.log('orderRes.data:', orderRes.data);
    const orderId = orderRes.data.order?._id;
    if (!orderId) {
      alert('Không tìm thấy ID đơn hàng.');
      return;
    }

    for (const item of cartItems) {
      const orderDetailsData = {
        orderId,
        productId: item.productId._id,
        quantity: item.quantity,
        totalPrice: item.quantity * item.productId.price,
      };
      console.log('Gửi orderDetailsData:', orderDetailsData);
      await axios.post('http://localhost:4001/api/orderDetails/create', orderDetailsData);
    }

    // await axios.delete(`http://localhost:3003/api/cart/deleteAllCartByUser/${user.id}`);

    alert('Đặt hàng thành công!');
    navigate('/myOrder');
  } catch (error) {
    if (error.response) {
      console.error('Lỗi response:', error.response.data);
      alert('Đặt hàng không thành công: ' + (error.response.data.message || 'Vui lòng thử lại.'));
    } else {
      console.error('Lỗi khi tạo đơn hàng:', error);
      alert('Đặt hàng không thành công. Vui lòng thử lại.');
    }
  }
};


=======
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
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
  return (
    <div className="payment-container">
      <div className="address-section">
        <h3>Địa chỉ nhận hàng</h3>
<<<<<<< HEAD
        <form className="address-form" onSubmit={e => e.preventDefault()}>
          <input type="text" placeholder="Họ và tên" value={shippingInfo.name} onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })} required />
          <input type="tel" placeholder="Số điện thoại" value={shippingInfo.phone} onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })} required />
          <input type="text" placeholder="Tỉnh / Thành phố" value={shippingInfo.province} onChange={(e) => setShippingInfo({ ...shippingInfo, province: e.target.value })} required />
          <input type="text" placeholder="Địa chỉ chi tiết" value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} required />
=======
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
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
        </form>
      </div>

      <div className="payment-method-section">
        <h3>Phương thức thanh toán</h3>
        <label>
<<<<<<< HEAD
          <input type="radio" name="paymentMethod" value="cod" onChange={(e) => setPaymentMethod(e.target.value)} />
=======
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
          Thanh toán khi nhận hàng (COD)
        </label>
      </div>

      <div className="transport-method">
<<<<<<< HEAD
        <h3>Chọn đơn vị vận chuyển</h3>
        <label>
          <input type="radio" name="transportMethod" value="GHN" onChange={handleTransportChange} />
          GHN: 35.000 đ
        </label>
        <label>
          <input type="radio" name="transportMethod" value="GHTK" onChange={handleTransportChange} />
          GHTK: 25.000 đ
        </label>
        <label>
          <input type="radio" name="transportMethod" value="ViettelPost" onChange={handleTransportChange} />
          Viettel Post: 30.000 đ
=======
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
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
        </label>
      </div>

      <div className="product-summary">
        <h3>Sản phẩm</h3>
        {loading ? (
          <p>Đang tải...</p>
        ) : cartItems.length === 0 ? (
<<<<<<< HEAD
          <p>Không có sản phẩm.</p>
=======
          <p>Giỏ hàng trống</p>
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
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
<<<<<<< HEAD
        <button className="btn-confirm" onClick={handleOrderSubmit} disabled={loading}>
          Đặt hàng
        </button>
=======
        <button className="btn-confirm" onClick={handleOrderSubmit}>Đặt hàng</button>
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
      </div>
    </div>
  );
};
