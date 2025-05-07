import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import './cart.css';

export const Cart = () => {
  const { cartItems, setCartItems } = useAppContext();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);


  const handleSelectItem = (productId) => {
    setSelectedItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.productId));
    }
  };

  const handleIncrease = (productId) => {
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (productId) => {
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setCartItems(prev => prev.filter(item => item.productId !== productId));
      setSelectedItems(prev => prev.filter(id => id !== productId));
    }
  };

  const handleBuyNow = () => {
    const updatedCart = cartItems.map(item => ({
      ...item,
      selected: selectedItems.includes(item.productId),
    }));
    setCartItems(updatedCart);
    navigate('/payment');
  };

  const totalSelectedPrice = selectedItems.reduce((total, productId) => {
    const item = cartItems.find(item => item.productId === productId);
    return total + (item?.productPrice || 0) * (item?.quantity || 0);
  }, 0);

  return (
    <div className="cart">
      <h2>Giỏ hàng của bạn</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Giỏ hàng trống</p>
          <Link to="/" className="btn-continue">Tiếp tục mua sắm</Link>
        </div>
      ) : (
        <>
          <div className="cart-header">
            <input
              type="checkbox"
              checked={selectedItems.length === cartItems.length}
              onChange={handleSelectAll}
            />
            <span>Chọn tất cả</span>
          </div>

          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.productId)}
                  onChange={() => handleSelectItem(item.productId)}
                />
                <img src={item.productImage} alt={item.productName} />
                <div className="cart-item-info">
                  <h4>{item.productName}</h4>
                  <p>Giá: đ{item.productPrice.toLocaleString()}</p>

                  <div className="quantity-control">
                    <button onClick={() => handleDecrease(item.productId)}>-</button>
                    <input type="text" value={item.quantity} readOnly />
                    <button onClick={() => handleIncrease(item.productId)}>+</button>
                  </div>

                  <p>Thành tiền: đ{(item.productPrice * item.quantity).toLocaleString()}</p>

                  <button className="btn-delete" onClick={() => handleDelete(item.productId)}>
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="footer-left">
              <input
                type="checkbox"
                checked={selectedItems.length === cartItems.length}
                onChange={handleSelectAll}
              />
              <span>Chọn tất cả ({selectedItems.length})</span>
            </div>

            <div className="footer-right">
              <p>Tổng thanh toán: <span>đ{totalSelectedPrice.toLocaleString()}</span></p>
              <button
                className="btn-buy"
                disabled={selectedItems.length === 0}
                onClick={handleBuyNow}
              >
                Mua hàng
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
