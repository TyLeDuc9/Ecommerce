import React from 'react';
import './product.css';
import { Button, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toSlug } from '../../utils/toSlug';
import { useAppContext } from '../../context/AppContext';

export const Product = () => {
  const {  products } = useAppContext(); 
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return <div>Không có sản phẩm nào</div>;
  }

  return (
    <section className="product">
      <Row className="product__title">
        <h4>Gợi ý hôm nay</h4>
      </Row>
      <Row>
        <Col span={24}>
          <div className='product__list'>
            {products.map((item) => ( 
              <div
                key={item._id}
                className='product__item'
                onClick={() =>
                  navigate(
                    `/product/${toSlug(item?.categoryId?.name || 'danh-muc')}/${item._id}`
                  )
                }
              >
                <img src={item.image?.[0]} alt={item.name} className='product__item-img' />
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
