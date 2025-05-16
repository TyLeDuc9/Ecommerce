import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export const PageAdmin = () => {
    const { handleAdminLogout, user } = useAppContext();
    const navigate = useNavigate();

    const onLogout = () => {
        handleAdminLogout();
        navigate('/loginAdmin');
    };

    return (
        <div className="seller-layout">
            <div className="seller-sidebar">
                <h2>Quản Trị Viên</h2>
                <ul>
                    <li><Link to="/pageAdmin/users">Quản lý users</Link></li>
                    <li><Link to="/pageAdmin/categories">Quản lý danh mục</Link></li>
                    <li><Link to="/pageAdmin/orders">Quản lý đơn hàng</Link></li>
                    <li><Link to="/pageAdmin/products">Quản lý sản phẩm</Link></li>
                    <li><Link to="/pageAdmin/settings">Cài đặt</Link></li>
                </ul>
            </div>

            <div className="seller-main">
                <div className="seller-header">
                    <span onClick={() => navigate('/admin/profile')} style={{ cursor: 'pointer' }}>
                        <i className="fa fa-user"></i> Xin chào, {user?.name || 'Admin'}!
                    </span>
                    <div className="seller-header-actions">
                        <i className="fa fa-bell"></i>
                        <span className="seller-name">{user?.name}</span>
                        <button className="logout-btn" onClick={onLogout}>
                            <i className="fa fa-sign-out-alt"></i> Đăng xuất
                        </button>
                    </div>
                </div>
                <div className="seller-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
