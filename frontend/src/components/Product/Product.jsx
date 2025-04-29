import React from 'react';
import './product.css';
import { Button, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toSlug } from '../../utils/toSlug';
import { useAppContext } from '../../context/AppContext';  

export const Product = () => {
  const { product , addToCart, updateCartItem, removeFromCart} = useAppContext(); 
  const navigate = useNavigate();

  return (
    <section className='product'>
      <Row className='product__title'>
        <h4>Gợi ý hôm nay</h4>
      </Row>
      <Row>
        <Col span={24}>
          <div className='product__list'>
            {product.map((item) => (
              <div
                key={item.id}
                className='product__item'
                onClick={() => navigate(`/product/${toSlug(item.category)}/${item.id}`)}
              >
                <div>
                  <img src={item.img[0]} alt={item.name} className='product__item-img' />
                </div>
                <div className='product__item-info'>
                  <p className='product__item-name'>{item.name}</p>
                  <span className='product__item-price'>{item.original_price}</span>
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
