<<<<<<< HEAD
=======

>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './cart.css';
<<<<<<< HEAD

=======
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
export const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const userData = localStorage.getItem('user');
  const parsedUser = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    if (!parsedUser) return;

<<<<<<< HEAD
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:3003/api/cart/user/${parsedUser.id}`);
        const cartData = res.data;

        const items = cartData.items.map(item => ({
          ...item,
          product: item.productId // Đã được populate từ backend
        }));

        setCartItems(items);
        setSelectedItems(items.map(item => item.product._id));
=======
    const fetchCartWithProductDetails = async () => {
      try {
        const cartRes = await axios.get(`http://localhost:3003/api/cart/user/${parsedUser.id}`);
        const cartData = cartRes.data;

        const enrichedCart = await Promise.all(
          cartData.map(async (item) => {
            try {
              const productId = item.productId._id || item.productId;
              const productRes = await axios.get(`http://localhost:4003/api/product/${productId}`);
              return {
                ...item,
                product: productRes.data
              };
            } catch (error) {
              console.error('Lỗi lấy sản phẩm:', error);
              return item;
            }
          })
        );

        setCartItems(enrichedCart);
        setSelectedItems(enrichedCart.map(item => item.productId._id || item.productId));
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
      } catch (err) {
        console.error('Lỗi lấy giỏ hàng:', err);
      }
    };

<<<<<<< HEAD
    fetchCart();
  }, [parsedUser?.id]);

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

=======
    fetchCartWithProductDetails();
  }, [parsedUser?.id]);


  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;


>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
    try {
      await axios.put(`http://localhost:3003/api/cart/updateCart/${cartItemId}`, { quantity: newQuantity });
      setCartItems(prev =>
        prev.map(item =>
          item._id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error('Lỗi cập nhật số lượng:', err);
    }
  };

  const handleDeleteItem = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:3003/api/cart/deleteCart/${cartItemId}`);
      setCartItems(prev => prev.filter(item => item._id !== cartItemId));
      setSelectedItems(prev => prev.filter(id => id !== cartItemId));
    } catch (err) {
      console.error('Lỗi xóa sản phẩm:', err);
    }
  };

<<<<<<< HEAD
  const totalSelectedPrice = cartItems
    .filter(item => selectedItems.includes(item.product._id))
    .reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);
=======


  const totalSelectedPrice = cartItems
    .filter(item => selectedItems.includes(item.productId._id || item.productId))
    .reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6

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
              onChange={() => {
                if (selectedItems.length === cartItems.length) {
                  setSelectedItems([]);
                } else {
<<<<<<< HEAD
                  setSelectedItems(cartItems.map(item => item.product._id));
=======
                  setSelectedItems(cartItems.map(item => item.productId._id || item.productId));
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
                }
              }}
            />
            <span>Chọn tất cả</span>
          </div>

          <div className="cart-items">
<<<<<<< HEAD
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.product._id)}
                  onChange={() => {
                    if (selectedItems.includes(item.product._id)) {
                      setSelectedItems(selectedItems.filter(id => id !== item.product._id));
                    } else {
                      setSelectedItems([...selectedItems, item.product._id]);
                    }
                  }}
                />
                <img src={item.product.image[0]} alt={item.product.name || 'Sản phẩm'} />
                <div className="cart-item-info">
                  <h4>{item.product.name}</h4>
                  <p>Giá: đ{(item.product.price).toLocaleString()}</p>
                  <div className="quantity-control">
                    <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                    <input type="text" value={item.quantity} readOnly />
                    <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                  <p>Thành tiền: đ{(item.product.price * item.quantity).toLocaleString()}</p>
                  <button className="btn-delete" onClick={() => handleDeleteItem(item._id)}>Xóa</button>
                </div>
              </div>
            ))}
=======
            {cartItems.map((item, index) => {
              const productId = item.productId._id || item.productId;
              return (
                <div className="cart-item" key={index}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(productId)}
                    onChange={() => {
                      if (selectedItems.includes(productId)) {
                        setSelectedItems(selectedItems.filter(id => id !== productId));
                      } else {
                        setSelectedItems([...selectedItems, productId]);
                      }
                    }}
                  />
                  <img src={item.product?.image[0]} alt={item.product?.name || 'Sản phẩm'} />
                  <div className="cart-item-info">
                    <h4>{item.product?.name || 'Tên sản phẩm'}</h4>
                    <p>Giá: đ{(item.product?.price || 0).toLocaleString()}</p>
                    <div className="quantity-control">
                      <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                      <input type="text" value={item.quantity} readOnly />
                      <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                    <p>Thành tiền: đ{((item.product?.price || 0) * item.quantity).toLocaleString()}</p>
                    <button className="btn-delete" onClick={() => handleDeleteItem(item._id)}>Xóa</button>
                  </div>
                </div>
              );
            })}
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
          </div>

          <div className="cart-footer">
            <div className="footer-left">
              <input
                type="checkbox"
                checked={selectedItems.length === cartItems.length}
                onChange={() => {
                  if (selectedItems.length === cartItems.length) {
                    setSelectedItems([]);
                  } else {
<<<<<<< HEAD
                    setSelectedItems(cartItems.map(item => item.product._id));
=======
                    setSelectedItems(cartItems.map(item => item.productId._id || item.productId));
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
                  }
                }}
              />
              <span>Chọn tất cả ({selectedItems.length})</span>
            </div>

            <div className="footer-right">
              <p>
                Tổng thanh toán:
                <span> đ{totalSelectedPrice.toLocaleString()}</span>
              </p>
              <Link to='/order'>
<<<<<<< HEAD
                <button className="btn-buy">Mua hàng</button>
              </Link>
=======
                <button className="btn-buy">Mua hàng</button></Link>
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
            </div>
          </div>
        </>
      )}
    </div>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> d51ceae8a306884018891f95347972e7100fc2e6
