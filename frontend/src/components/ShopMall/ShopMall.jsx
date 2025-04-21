import React from 'react'
import './shopmall.css'
import { ViewAllLink } from '../ViewAllLink/ViewAllLink';
import { Button, Col, Row } from 'antd';
import logo from '../../assets/images/logo/logoMall.jpg';
import shopMallData from '../../assets/data/shopMall'
export const ShopMall = () => {
  return (
    <section className='shopmall'>
      <Row className="shopmall__title" justify="space-between" align="middle">
        <Col>
          <h4>Shopee Mall</h4>
        </Col>
        <Col>
          <ul className="shopmall__lists">
            <li><i class="fa-solid fa-arrow-left"></i>Trả hàng Miễn phí 15 ngày</li>
            <li><i class="fa-solid fa-shield"></i>Hàng chính hãng 100%</li>
            <li><i class="fa-solid fa-truck"></i>Miễn phí vận chuyển</li>
          </ul>
        </Col>
        <Col>
          <ViewAllLink className="shopmall__all" />
        </Col>
      </Row>

      <Row className='shopmall__container' align="middle">
        <Col span={8}>
          <div className='shopmall__logo'>
            <img src={logo} alt="Shopee Mall Logo" />
          </div>
        </Col>

        <Col span={16}>
          <div className='shopmall__store'>
            {
              shopMallData.map((item, index) => (
                <div key={index} className='shopmall__brands'>
                  <div className='shopmall__brands-img'>
                    <img src={item.img} alt={item.name} />
                  </div>
                  <span className='shopmall__brands-name'>{item.name}</span>
                </div>
              ))
            }
          </div>
        </Col>
      </Row>

    </section>
  )
}
