import React from 'react'
import categoryData from '../../assets/data/category'
import { Col, Row } from 'antd';
import './category.css'
export const Category = () => {
    return (
        <section className='category'>
            <h2>Danh Mục</h2>
            <Row>
                <Col span={24}>
                <div className='category__list'>
                {
                    categoryData.map((item) => (
                        <div key={item.id} className='category__item'>
                            <div className='category__item-img'>
                                <img src={item.img} />
                            </div>
                            <span>{item.name}</span>
                        </div>

                    ))
                }
            </div>
                </Col>
            </Row>
        </section>
    )
}
