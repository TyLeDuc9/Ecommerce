import React from 'react';
import './item.css';
import productData from '../../assets/data/product';
import { Button, Col, Row } from 'antd';

export const Item = () => {
  return (
    <section className='product'>
      <Row className='product__title'>
          <h4>Gợi ý hôm nay</h4>
      </Row>
      <Row>
        <Col span={24}>
          <div className='product__list'>
            {productData.map((item, index) => (
              <div key={index} className='product__item'>
                <div>
                  <img src={item.img} alt={item.name} className='product__item-img' />
                </div>
                <div className='product__item-info'>
                  <p className='product__item-name'>{item.name}</p>
                  <span className='product__item-price'>{item.price}</span>
                </div>
              </div>
            ))} 
          </div>
        </Col>
      </Row>
      <Button
        className="product__btn">
        Xem thêm
      </Button>
    </section>
  );
};
