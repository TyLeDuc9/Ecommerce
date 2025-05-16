import React, { useState, useEffect } from 'react';
import './sellerform.css';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';

export const SellerForm = () => {
    const { user } = useAppContext();
    const [images, setImages] = useState([]);
    const [storeName, setStoreName] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load dữ liệu từ localStorage khi reload
    useEffect(() => {
        const savedStoreName = localStorage.getItem('storeName');
        const savedStoreAddress = localStorage.getItem('storeAddress');
        const savedPhone = localStorage.getItem('phone');
        const savedImages = JSON.parse(localStorage.getItem('images'));

        if (savedStoreName) setStoreName(savedStoreName);
        if (savedStoreAddress) setStoreAddress(savedStoreAddress);
        if (savedPhone) setPhone(savedPhone);
        if (savedImages && Array.isArray(savedImages)) {
            const loadedImages = savedImages.map((base64) => ({ file: null, preview: base64 }));
            setImages(loadedImages);
        }
    }, []);

    // Lưu input vào state và localStorage
    const handleInputChange = (e, setter) => {
        const { name, value } = e.target;
        setter(value);
        localStorage.setItem(name, value);
    };

    // Xử lý khi chọn ảnh
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const newImages = [...images];
            newImages[index] = { file, preview: reader.result };
            setImages(newImages);
            localStorage.setItem('images', JSON.stringify(newImages.map(img => img.preview)));
        };
        reader.readAsDataURL(file);
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = user?.id;
        const token = localStorage.getItem('token');

        if (!user || !userId || !token) {
            alert('Bạn chưa đăng nhập hoặc token bị thiếu.');
            return;
        }

        const formData = new FormData();
        formData.append('storeName', storeName);
        formData.append('storeAddress', storeAddress);
        formData.append('phone', phone);
        formData.append('userId', userId);

        images.forEach((imgObj) => {
            if (imgObj.file) {
                formData.append('image', imgObj.file);
            }
        });

        try {
            setIsSubmitting(true);
            const res = await axios.post('http://localhost:3006/api/seller/create', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            localStorage.setItem('sellerId', res.data._id);
            alert('Tạo shop thành công!');

            // Xoá dữ liệu
            // localStorage.removeItem('storeName');
            // localStorage.removeItem('storeAddress');
            // localStorage.removeItem('phone');
            // localStorage.removeItem('images');

            // setStoreName('');
            // setStoreAddress('');
            // setPhone('');
            // setImages([]);
        } catch (error) {
            // console.error('Lỗi khi tạo seller:', error.response?.data || error.message);
            alert('Có lỗi xảy ra khi tạo seller.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form__seller-info">
            <form className="form-container-seller" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Tên Shop</label>
                    <input
                        type="text"
                        className="form-input"
                        name="storeName"
                        value={storeName}
                        onChange={(e) => handleInputChange(e, setStoreName)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Địa chỉ</label>
                    <input
                        type="text"
                        className="form-input"
                        name="storeAddress"
                        value={storeAddress}
                        onChange={(e) => handleInputChange(e, setStoreAddress)}
                        required
                    />
                </div>

                <div className="form-group small">
                    <label className="form-label">Điện thoại</label>
                    <input
                        type="text"
                        className="form-input"
                        name="phone"
                        value={phone}
                        onChange={(e) => handleInputChange(e, setPhone)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Avatar</label>
                    <div className="image-upload-group">
                        {[...Array(1)].map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input
                                    accept="image/*"
                                    type="file"
                                    id={`image${index}`}
                                    name="images"
                                    hidden
                                    onChange={(e) => handleImageChange(e, index)}
                                />
                                <img
                                    className="upload-preview"
                                    src={
                                        images[index]?.preview ||
                                        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                                    }
                                    alt="upload"
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <button type="submit" className="submit-btn-save" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang lưu...' : 'Lưu'}
                </button>
            </form>
        </div>
    );
};
