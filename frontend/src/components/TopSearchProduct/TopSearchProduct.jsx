import React from 'react';
import './topsearchproduct.css';
import topsearchproductData from '../../assets/data/topSearchProduct';
import { Button, Col, Row } from 'antd';
import { ViewAllLink } from '../ViewAllLink/ViewAllLink';
export const TopSearchProduct = () => {
    return (
        <section className='topsearch__product'>
            <Row className="topsearch__title" justify="space-between" align="middle">
                <h4>Tìm kiếm hàng đầu</h4>
                <ViewAllLink className="topsearch__all" />
            </Row>
            <Row>
                <Col span={24}>
                    <div className='topsearch__list'>
                        {
                            topsearchproductData.map((item, index) => (
                                <div key={index} className="topsearch-item">
                                    <div className="topsearch__img">
                                        <div className="top-badge">TOP</div>
                                        <img src={item.img} alt={item.name} />
                                    </div>
                                    <p className="product-name">{item.name}</p>
                                </div>
                            ))
                        }
                    </div>
                </Col>
            </Row>
        </section>
    );
};
