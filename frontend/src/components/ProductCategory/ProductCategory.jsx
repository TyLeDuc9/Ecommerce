import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Col } from 'antd';
import { Banner } from '../Banner/Banner';
import banner1 from '../../assets/images/banner/banner1.jpg';
import banner2 from '../../assets/images/banner/banner2.jpg';
import './productcategory.css';
import { toSlug } from '../../utils/toSlug';

const images = [banner1, banner2];

export const ProductCategory = () => {
    const { category } = useParams();
    const { products } = useAppContext();

    const filteredProduct = products.filter((item) =>
        toSlug(item.categoryId?.name) === category
    );

    return (
        <>
            <Banner images={images} />
            <section className='product__category'>
                <Col className='navbar' span={4}></Col>
                <Col span={20}>
                    <div className="filtered__products">
                        {filteredProduct.length > 0 ? (
                            filteredProduct.map((item) => (
                                <div key={item._id} className='product__category-item'>
                                    <Link to={`/product/${category}/${item._id}`}>
                                        <div>
                                            <img
                                                src={item.image?.[0]}
                                                alt={item.name}
                                                className='product__category-img'
                                            />
                                        </div>
                                        <div className='product__category-info'>
                                            <p className='product__category-name'>{item.name}</p>
                                            <span className='product__category-price'>
                                                {item.price.toLocaleString()}₫
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>Không có sản phẩm nào trong danh mục này.</p>
                        )}
                    </div>
                </Col>
            </section>
        </>
    );
};
