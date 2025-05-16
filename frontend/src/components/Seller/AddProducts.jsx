import React, { useState } from 'react';
import './addProducts.css';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const AddProducts = () => {
    const { categories, user, token } = useAppContext();
    const navigate = useNavigate();
    const userId = user?.id;
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('in_stock');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 6); // giới hạn 6 ảnh
        setImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('describe', description);
        formData.append('categoryId', category);
        formData.append('status', status);
        formData.append('price', price);
        formData.append('quantity', quantity);
        const sellerId = localStorage.getItem('sellerId');
        formData.append('sellerId', sellerId);
        formData.append('userId', userId);

        images.forEach((img) => {
            formData.append('image', img);
        });

        try {
            const res = await axios.post('http://localhost:4003/api/product/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Thêm sản phẩm thành công!');
            navigate('/seller');
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error.message);
            alert('Thêm sản phẩm thất bại.');
        }
    };

    return (
        <div className="product-form">
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Hình ảnh sản phẩm (tối đa 6 ảnh)</label>
                    <input
                        accept="image/*"
                        type="file"
                        name="image"
                        multiple
                        onChange={handleImageChange}
                    />
                    <div className="image-preview-group">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(img)}
                                alt={`preview-${index}`}
                                className="upload-preview"
                            />
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                    <input
                        id="name"
                        type="text"
                        className="form-input"
                        placeholder="Nhập tên sản phẩm"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="form-label">Mô tả sản phẩm</label>
                    <input
                        id="description"
                        className="form-input"
                        rows="4"
                        placeholder="Nhập mô tả"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></input>
                </div>

                <div className="form-group">
                    <label htmlFor="category" className="form-label">Danh mục</label>
                    <select
                        id="category"
                        className="form-input"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Chọn danh mục</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>

                    <label htmlFor="status" className="form-label">Trạng thái</label>
                    <select
                        id="status"
                        className="form-input"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="in_stock">Còn hàng</option>
                        <option value="out_of_stock">Hết hàng</option>
                    </select>
                </div>

                <div className="form-row">
                    <div className="form-group small">
                        <label htmlFor="price" className="form-label">Giá sản phẩm</label>
                        <input
                            id="price"
                            type="number"
                            className="form-input"
                            placeholder="0"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div className="form-group small">
                        <label htmlFor="quantity" className="form-label">Số lượng</label>
                        <input
                            id="quantity"
                            type="number"
                            className="form-input"
                            placeholder="0"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="submit-btn">
                    THÊM SẢN PHẨM
                </button>
            </form>
        </div>
    );
};
