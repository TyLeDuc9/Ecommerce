import React, { useState } from 'react';
import './addProducts.css';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';

export const AddProducts = () => {
    const { categories } = useAppContext();

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        category: '',
        status: '',
        price: 0,
        quantity: 0
    });

    const [images, setImages] = useState([]);

    const handleInputChange = (e) => {
        setProductData({ ...productData, [e.target.id]: e.target.value });
    };

    const handleImageChange = (e, index) => {
        const files = [...images];
        files[index] = e.target.files[0];
        setImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('description', productData.description);
            formData.append('category', productData.category);
            formData.append('status', productData.status);
            formData.append('price', productData.price);
            formData.append('quantity', productData.quantity);

            images.forEach((img) => {
                if (img) formData.append('images', img);
            });

            const res = await axios.post('http://localhost:4003/api/product/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            alert('Sản phẩm đã được thêm thành công!');
            console.log(res.data);

        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            alert('Thêm sản phẩm thất bại');
        }
    };

    return (
        <div className="product-form">
            <form className="form-container" onSubmit={handleSubmit}>
                {/* Image Upload */}
                <div className="form-group">
                    <label className="form-label">Product Image</label>
                    <div className="image-upload-group">
                        {Array(6).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input
                                    accept="image/*"
                                    type="file"
                                    id={`image${index}`}
                                    hidden
                                    onChange={(e) => handleImageChange(e, index)}
                                />
                                <img
                                    className="upload-preview"
                                    src={
                                        images[index]
                                            ? URL.createObjectURL(images[index])
                                            : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                                    }
                                    alt="upload"
                                />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Product Name */}
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Product Name</label>
                    <input id="name" type="text" className="form-input" placeholder="Type here" required onChange={handleInputChange} />
                </div>

                {/* Description */}
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Product Description</label>
                    <textarea id="description" className="form-input" rows="4" placeholder="Type here" onChange={handleInputChange}></textarea>
                </div>

                {/* Category & Status */}
                <div className="form-group">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select id="category" className="form-input" onChange={handleInputChange}>
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>

                    <label htmlFor="status" className="form-label">Status</label>
                    <select id="status" className="form-input" onChange={handleInputChange}>
                        <option value="in_stock">Còn hàng</option>
                        <option value="out_of_stock">Hết hàng</option>
                    </select>
                </div>

                {/* Price & Quantity */}
                <div className="form-row">
                    <div className="form-group small">
                        <label htmlFor="price" className="form-label">Product Price</label>
                        <input id="price" type="number" className="form-input" placeholder="0" required onChange={handleInputChange} />
                    </div>
                    <div className="form-group small">
                        <label htmlFor="quantity" className="form-label">Số Lượng</label>
                        <input id="quantity" type="number" className="form-input" placeholder="0" required onChange={handleInputChange} />
                    </div>
                </div>

                <button type="submit" className="submit-btn">ADD</button>
            </form>
        </div>
    );
};
