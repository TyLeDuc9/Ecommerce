import React, { useEffect, useState, useMemo } from 'react';
import './productdetails.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Col } from 'antd';
import { toSlug } from '../../utils/toSlug';
import { useAppContext } from '../../context/AppContext';
import { PurchaseBenefits } from '../PurchaseBenefits/PurchaseBenefits';

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { product, addToCart } = useAppContext();
  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const currentProduct = useMemo(() => {
    return product.find((item) => item.id === Number(id));
  }, [product, id]);

  // useEffect(() => {
  //   if (product.length > 0 && currentProduct) {
  //     const related = product.filter(
  //       (item) => item.category === currentProduct.category && item.id !== currentProduct.id
  //     );
  //     setRelatedProducts(related.slice(0, 5));
  //   }
  // }, [product, currentProduct]);

  useEffect(() => {
    if (currentProduct) {
      setThumbnail(currentProduct?.img?.[0] || null);
    }
  }, [currentProduct]);

  if (!currentProduct) {
    return <div>Đang tải sản phẩm...</div>;
  }

  const handleIncrease = () => {
    if (quantity < currentProduct.stock_quantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(currentProduct.id, quantity); 
  };
  

  const handleBuyNow = () => {
    addToCart(currentProduct.id, quantity); 
    navigate("/cart");
  };

  return (
    <div className="product__details">
      <p className="product__details-nav">
        <Link to="/">Trang chủ</Link> /
        <Link to="/product">Sản phẩm</Link> /
        <Link to={`/product/${toSlug(currentProduct.category)}`}>{currentProduct.category}</Link> /
        <span className="highlight">{currentProduct.name}</span>
      </p>

      <section className="product__details-container">
        <Col span={10}>
          <div className="product__details-box">
            <div className="product__details-list">
              <div className="product__details-select">
                <img src={thumbnail} alt="Selected product" />
              </div>
              <div className="product__details-img">
                {currentProduct.img.map((image, index) => (
                  <div key={index} onClick={() => setThumbnail(image)}>
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Col>

        <Col span={14}>
          <div className="product__details-info">
            <p>{currentProduct.name}</p>
          </div>

          <div className="product___details-review">
            <p>{currentProduct.rating}</p>
            <div>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>

          <div className="product__details-benefit">
            <span>An tâm mua sắm cùng Shopee</span>
            <PurchaseBenefits />
          </div>

          <div className="product__details-price">
            <p>đ{currentProduct.discounted_price}</p>
            <p>đ{currentProduct.original_price}</p>
            <p>{currentProduct.discount_percent}%</p>
          </div>

          <div className="product__details-count">
            <p>Số Lượng:</p>
            <div className="quantity-control">
              <button onClick={handleDecrease}>-</button>
              <input
                type="text"
                value={quantity}
                readOnly
              />
              <button onClick={handleIncrease}>+</button>
            </div>
            <p>{currentProduct.stock_quantity} <span>sản phẩm có sẵn</span></p>
          </div>

          <div className="product__details-add">
            <button className="product__details-cart" onClick={handleAddToCart}>
              <i className="fa-solid fa-cart-shopping"></i>
              Thêm vào giỏ hàng
            </button>
            <button className="product__details-voucher" onClick={handleBuyNow}>
              Mua với Voucher {currentProduct.discounted_price}
            </button>
          </div>
        </Col>
      </section>
    </div>
  );
};

