import React from 'react';
import categoryData from '../../assets/data/category';
import { Col, Row } from 'antd';
import './category.css';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';
import { toSlug } from '../../utils/toSlug';
export const Category = () => {
    const navigate = useNavigate();

    return (
        <section className='category'>
            <h2>Danh Mục</h2>
            <Row>
                <Col span={24}>
                    <div className='category__list'>
                        {
                            categoryData.map((item) => {
                                const path = toSlug(item.name);
                                return (
                                    <div
                                        key={item.id}
                                        className='category__item'
                                        onClick={() => navigate(`/product/${path}`)}
                                    >
                                        <div className='category__item-img'>
                                            <img src={item.img} alt={item.name} />
                                        </div>
                                        <span>{item.name}</span>
                                    </div>
                                );
                            })
                        }
                    </div>
                </Col>
            </Row>
        </section>
    );
};
