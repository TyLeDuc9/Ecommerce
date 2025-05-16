import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './userAdmin.css';

export const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:4005/api/auth/all');
      setUsers(res.data.users || []);
      setError('');
    } catch (err) {
      console.error('Lỗi khi lấy dữ liệu:', err.message);
      setError('Không thể lấy danh sách người dùng.');
    }
  };

  const searchUsers = async () => {
    if (!searchTerm.trim()) {
      fetchUsers(); // Nếu không nhập gì thì load lại tất cả
      return;
    }
    try {
      const res = await axios.get(`http://localhost:4005/api/auth/search?name=${searchTerm}`);
      setUsers(res.data.users || []);
      setError('');
    } catch (err) {
      console.error('Lỗi khi tìm kiếm:', err.message);
      setError('Không thể tìm kiếm người dùng.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const sortUsersByName = async (order) => {
    try {
      const res = await axios.get(`http://localhost:4005/api/auth/sort?order=${order}`);
      setUsers(res.data.users || []);
      setError('');
    } catch (err) {
      console.error('Lỗi khi sắp xếp người dùng:', err.message);
      setError('Không thể sắp xếp người dùng.');
    }
  };
  useEffect(() => {
    sortUsersByName(sortOrder);
  }, [sortOrder]);

  return (
    <div className="user-admin-container">
      <h2>Danh sách người dùng</h2>

      <div className="search-container">
        <div className='search__admin-category'>
          <input
            type="text"
            placeholder="Nhập tên cần tìm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={searchUsers}>Tìm kiếm</button>
        </div>
        <div className="sort-container">
          <label htmlFor="sortOrder">Sắp xếp theo tên</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Tăng dần (A-Z)</option>
            <option value="desc">Giảm dần (Z-A)</option>
          </select>
        </div>

      </div>

      {error && <p className="error-message">{error}</p>}

      <table className="user-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Không có người dùng nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
