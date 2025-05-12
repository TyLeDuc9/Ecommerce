import React, { useState, useEffect } from 'react';
import './customerprofile.css';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';

export const CustomerProfile = () => {
    const { user } = useAppContext();

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        birthday: '',
        gender: '',
    });

    const [customerId, setCustomerId] = useState(null);

    useEffect(() => {
        if (user?._id) {
            fetchCustomer(user._id);
        } else {
            resetForm();
        }
    }, [user]);

    const fetchCustomer = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:3002/api/customer/user/${userId}`);
            if (res.data) {
                const { fullName, phone, address, birthday, gender, _id } = res.data;
                setFormData({ fullName, phone, address, birthday: birthday?.substring(0, 10), gender });
                setCustomerId(_id);
            }
        } catch (error) {
            if (error.response?.status === 404) {
                // Chưa có customer => tạo mới
                createCustomer(userId);
            } else {
                console.error('Lỗi lấy thông tin customer:', error.message);
            }
        }
    };

    const createCustomer = async (userId) => {
        try {
            const res = await axios.post(`http://localhost:3002/api/customer/create`, {
                fullName: '',
                phone: '',
                address: '',
                birthday: '',
                gender: '',
                userId,  // Đảm bảo `userId` được gửi chính xác
            });
            const { _id } = res.data.customer;
            setCustomerId(_id);  // Lưu lại `_id` của customer vào state
        } catch (error) {
            console.error('Lỗi tạo customer:', error.message);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!customerId) return;

        try {
            await axios.put(`http://localhost:3002/api/customer/update/${customerId}`, formData);
            alert('Cập nhật thông tin thành công!');
        } catch (error) {
            console.error('Lỗi cập nhật customer:', error.message);
        }
    };

    const resetForm = () => {
        setFormData({
            fullName: '',
            phone: '',
            address: '',
            birthday: '',
            gender: '',
        });
        setCustomerId(null);
    };

    return (
        <div className="customer-profile">
            <h2>Thông Tin Khách Hàng</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Họ và tên</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="input-phone"
                    />
                </div>
                <div className="form-group">
                    <label>Điện Thoại</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="input-phone"
                    />
                </div>
                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="input-phone"
                    />
                </div>
                <div className="form-group">
                    <label>Sinh Nhật</label>
                    <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        required
                        className="input-date"
                    />
                </div>
                <div className="form-group">
                    <label>Giới tính</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="input-gender"
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                    </select>
                </div>
                <button type="submit" className="updateProfile">
                    Lưu
                </button>
            </form>
        </div>
    );
};
