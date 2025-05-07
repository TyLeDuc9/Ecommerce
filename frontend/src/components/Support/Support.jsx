import React from 'react';
import './support.css';
import logo from '../../assets/images/logo/logo.png';
import { Link, useNavigate } from 'react-router-dom';
export const Support = () => {
    return (
        <div className="support__container">
            <div className='support__container-header'>
                <div className='support__container-logo'>
                    <Link to="/home">
                        <img src={logo} alt="Shopee Logo" className="support__container-img" />
                    </Link>
                </div>
                <h1>Trung tâm trợ giúp</h1>
            </div>
            <div className='support__container-search'>
                <p>Xin chào, Shopee có thể giúp gì cho bạn?</p>
                <div className="support__container-searchInput">
                    <input type="text" placeholder="Nhập từ khóa cần tìm" />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
            <div className='support__container-question'>
                <span>Câu hỏi thường gặp</span>
                <ul>
                    <li>[Cảnh báo lừa đảo] Mua sắm an toàn cùng Shopee</li>
                    <li>[Dịch vụ] Cách liên hệ Chăm sóc khách hàng, Hotline, Tổng đài Shopee</li>
                    <li>[Bảo mật tài khoản] Làm gì khi nhận được thông báo là thông tin tài khoản Shopee đã được thay đổi?</li>
                    <li>[Thành viên mới] Tại sao tôi không thể tải hình ảnh/video lên Ứng dụng Shopee?</li>
                    <li>[Thao tác] Hướng Dẫn Cài Đặt Và Cập Nhật Phiên Bản Mới Của Ứng Dụng Shopee</li>
                </ul>
            </div>

        </div>
    );
};
