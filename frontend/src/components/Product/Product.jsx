import React, { useEffect, useState } from 'react';
import './product.css';
import axios from 'axios';
import { Button, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toSlug } from '../../utils/toSlug';
import { useAppContext } from '../../context/AppContext';  

export const Product = () => {
  const { addToCart } = useAppContext(); 
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:4003/api/product/all');
        setProducts(res.data.products || []); 
      } catch (err) {
        console.error('Lỗi lấy sản phẩm:', err.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className='product'>
      <Row className='product__title'>
        <h4>Gợi ý hôm nay</h4>
      </Row>
      <Row>
        <Col span={24}>
          <div className='product__list'>
            {products.map((item) => (
              <div
                key={item._id}
                className='product__item'
                onClick={() => navigate(`/product/${toSlug(item.categoryId.name)}/${item._id}`)}
              >
                <div>
                  <img src={item.image?.[0]} alt={item.name} className='product__item-img' />
                </div>
                <div className='product__item-info'>
                  <p className='product__item-name'>{item.name}</p>
                  <span className='product__item-price'>{item.price.toLocaleString()}₫</span>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Button className="product__btn">Xem thêm</Button>
    </section>
  );
};
