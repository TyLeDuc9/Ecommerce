import React, { useEffect, useState } from 'react';
import './productdetails.css';
import { Col } from 'antd';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import { PurchaseBenefits } from '../PurchaseBenefits/PurchaseBenefits';
import { toSlug } from '../../utils/toSlug';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [thumbnail, setThumbnail] = useState(null);

  const { addToCart } = useAppContext();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4003/api/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  useEffect(() => {
    if (product) {
      setThumbnail(product?.image?.[0] || null);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;

    if (quantity <= 0 || quantity > product.quantity) {
      alert(` Số lượng phải từ 1 đến ${product.quantity}`);
      return;
    }

    addToCart(product, quantity);

  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      if (val < 1) {
        setQuantity(1);
      } else if (val > product.quantity) {
        setQuantity(product.quantity);
        alert(` Chỉ còn ${product.quantity} sản phẩm trong kho`);
      } else {
        setQuantity(val);
      }
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (!product) return <p>Không tìm thấy sản phẩm.</p>;

  return (
    <div className="product__details">
      <p className="product__details-nav">
        <Link to="/">Trang chủ</Link> /
        <Link to="/">Sản phẩm</Link> /
        <Link to={`/product/${toSlug(product.categoryId.name)}`}>{product.categoryId.name}</Link> /
        <span className="highlight">{product.name}</span>
      </p>

      <section className="product__details-container">
        <Col span={10}>
          <div className="product__details-box">
            <div className="product__details-list">
              <div className="product__details-select">
                <img src={thumbnail} alt="Selected product" />
              </div>
              <div className="product__details-img">
                {product.image.map((img, index) => (
                  <div key={index} onClick={() => setThumbnail(img)}>
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Col>

        <Col span={14}>
          <div className="product__details-info">
            <p>{product.name}</p>
          </div>

          <div className="product___details-review">
            <div>
              {[...Array(5)].map((_, i) => (
                <i className="fa-solid fa-star" key={i}></i>
              ))}
            </div>
          </div>

          <div className="product__details-benefit">
            <span>An tâm mua sắm cùng Shopee</span>
            <PurchaseBenefits />
          </div>

          <div className="product__details-price">
            <p>đ{product.price}</p>
          </div>

          <div className="product__details-count">
            <p>Số Lượng:</p>
            <div className="quantity-control">
              <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product.quantity}
              />
              <button
                onClick={() => {
                  if (quantity < product.quantity) {
                    setQuantity(quantity + 1);
                  } else {
                    alert(` Chỉ còn ${product.quantity} sản phẩm trong kho`);
                  }
                }}
              >+</button>
            </div>
            <p>{product.quantity} <span>Sản phẩm {product.status}</span></p>
          </div>

          <div className="product__details-add">
            <button className="product__details-cart" onClick={handleAddToCart}>
              <i className="fa-solid fa-cart-shopping"></i>
              Thêm vào giỏ hàng
            </button>
            <button className="product__details-voucher">
              Mua với Voucher {product.discounted_price}
            </button>
          </div>
        </Col>
      </section>
    </div>
  );
};
