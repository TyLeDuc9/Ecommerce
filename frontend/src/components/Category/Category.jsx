import React from 'react';
import categoryData from '../../assets/data/category';
import { Col, Row } from 'antd';
import './category.css';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';

export const Category = () => {
    const navigate = useNavigate();
    const toSlug = (str) =>
        str.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // xóa dấu
            .replace(/đ/g, "d") // xử lý riêng cho đ
            .replace(/Đ/g, "d") // xử lý riêng cho Đ
            .replace(/[^a-zA-Z0-9\s]/g, "") // xóa ký tự đặc biệt
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-"); // thay khoảng trắng = dấu gạch

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
