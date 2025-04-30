import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import './cart.css';

export const Cart = () => {
    const { cartItems, product, setCartItems } = useAppContext();
    const navigate = useNavigate();

    const [selectedItems, setSelectedItems] = useState([]);

    const getProductById = (id) => product.find((item) => item.id === id);

    const handleSelectItem = (productId) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter(id => id !== productId)
                : [...prevSelected, productId]
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
        setCartItems((prev) =>
            prev.map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const handleDecrease = (productId) => {
        setCartItems((prev) =>
            prev.map(item =>
                item.productId === productId && item.quantity > 1
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            )
        );
    };

    const handleDelete = (productId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            setCartItems((prev) => prev.filter(item => item.productId !== productId));
            setSelectedItems((prev) => prev.filter(id => id !== productId));
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

    const totalSelectedPrice = selectedItems.reduce((acc, productId) => {
        const item = cartItems.find(item => item.productId === productId);
        const prod = getProductById(productId);
        if (!item || !prod) return acc;
        return acc + prod.discounted_price * item.quantity;
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
                        {cartItems.map((item, index) => {
                            const prod = getProductById(item.productId);
                            if (!prod) return null;

                            return (
                                <div className="cart-item" key={index}>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.productId)}
                                        onChange={() => handleSelectItem(item.productId)}
                                    />
                                    <img src={prod.img[0]} alt={prod.name} />
                                    <div className="cart-item-info">
                                        <h4>{prod.name}</h4>
                                        <p>Giá: đ{prod.discounted_price.toLocaleString('vi-VN')}</p>

                                        <div className="quantity-control">
                                            <button onClick={() => handleDecrease(item.productId)}>-</button>
                                            <input type="text" value={item.quantity} readOnly />
                                            <button onClick={() => handleIncrease(item.productId)}>+</button>
                                        </div>

                                        <p>Thành tiền: đ{(prod.discounted_price * item.quantity).toLocaleString('vi-VN')}</p>

                                        <button className="btn-delete" onClick={() => handleDelete(item.productId)}>
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
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
                            <p>Tổng thanh toán: <span>đ{totalSelectedPrice.toLocaleString('vi-VN')}</span></p>
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
