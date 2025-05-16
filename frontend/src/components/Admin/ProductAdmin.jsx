import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './productAdmin.css';
import { useAppContext } from '../../context/AppContext';

export const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAppContext();

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:4003/api/product/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data.products || []);
      setError(null);
    } catch (err) {
      setError('Lỗi khi tải danh sách sản phẩm.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Đang tải dữ liệu sản phẩm...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>Không có sản phẩm nào.</p>;

  return (
    <div className="product-admin">
      <h2>Danh sách sản phẩm</h2>
      <table>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Danh mục</th>
            <th>Người bán</th>
            <th>Giá</th>
            <th>Ảnh</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.categoryId?.name || 'Không có'}</td>
              <td>{product.sellerId?.storeName || 'Không có'}</td>
              <td>{product.price?.toLocaleString()} VND</td>
              <td>
                {product.image && product.image.length > 0 ? (
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                ) : (
                  'Không có ảnh'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
