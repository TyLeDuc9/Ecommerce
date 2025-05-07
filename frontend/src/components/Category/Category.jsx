import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import './category.css';
import { useNavigate } from 'react-router-dom';
import { toSlug } from '../../utils/toSlug';
import { useAppContext } from '../../context/AppContext';
export const Category = () => {
    const navigate = useNavigate();
    const { categories } = useAppContext(); 

    return (
        <section className='category'>
            <h2>Danh Mục</h2>
            <Row>
                <Col span={24}>
                    <div className='category__list'>
                        {categories.map((item) => {
                            const path = toSlug(item.name);
                            return (
                                <div
                                    key={item._id}
                                    className='category__item'
                                    onClick={() => navigate(`/product/${path}`)} 
                                >
                                    <div className='category__item-img'>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <span>{item.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </Col>
            </Row>
        </section>
    );
};
