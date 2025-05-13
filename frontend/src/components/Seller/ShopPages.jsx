import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './shoppages.css';
import { useParams } from 'react-router-dom';
import { toSlug } from '../../utils/toSlug';
export const ShopPages = () => {
    const { sellerId } = useParams();
    const [shopInfo, setShopInfo] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]); // Lưu sản phẩm của shop
    const navigate = useNavigate();
    useEffect(() => {
        const fetchShopInfo = async () => {
            try {
                const res = await axios.get(`http://localhost:4003/api/product/sellers/${sellerId}`);
                console.log('Shop info:', res.data);
                if (res.data && res.data.length > 0) {
                    setShopInfo(res.data[0].sellerId);  // Lấy thông tin shop từ sản phẩm đầu tiên
                    setProducts(res.data); // Lưu tất cả các sản phẩm của shop

                    // Tạo mảng các danh mục từ các sản phẩm trong shop
                    const productCategories = res.data.map(product => product.categoryId.name);
                    setCategories([...new Set(productCategories)]); // Loại bỏ các danh mục trùng lặp
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin seller:', error);
            }
        };

        if (sellerId) {
            fetchShopInfo();
        }
    }, [sellerId]);

    if (!shopInfo || products.length === 0) return <div>Loading...</div>;

    return (
        <>
            <div className="shop-page">
                <div className="shopIno">
                    <div className="shop-info-left">
                        <img
                            className="shop-avatar"
                            src={shopInfo?.image?.[0] || "/default-avatar.png"}
                            alt="Shop Avatar"
                        />
                        <div className="shop-details">
                            <h2 className="shop-name">{shopInfo?.storeName || "Tên shop"}</h2>
                            <p className="shop-online">Online: 7 minutes ago</p>
                        </div>
                    </div>
                    <div className="shop-info-right">
                        <p className="stat-title">Địa chỉ: {shopInfo?.storeAddress || "Địa chỉ chưa có"}</p>
                        <p className="stat-title">Số điện thoại: {shopInfo?.phone || "Số điện thoại chưa có"}</p>
                    </div>
                </div>
                <div className="shop__category">
                    <h3>Danh mục sản phẩm</h3>
                    <ul>
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <li key={index}>{category}</li>
                            ))
                        ) : (
                            <li>Chưa có danh mục sản phẩm</li>
                        )}
                    </ul>
                </div>
            </div>

            <div className="shop__products">
                <h3>Sản phẩm của Shop</h3>
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
                            <img src={item.image?.[0]} alt="product" className='product__item-img' />
                            console.log(item.image);
                            <div className='product__item-info'>
                                <p className='product__item-name'>{item.name}</p>
                                <span className='product__item-price'>{item.price.toLocaleString()}₫</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
