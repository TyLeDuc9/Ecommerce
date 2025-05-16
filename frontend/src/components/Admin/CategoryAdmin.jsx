import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './categoryAdmin.css';
import { useAppContext } from '../../context/AppContext';
export const CategoryAdmin = () => {
    const { token } = useAppContext();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [sortOrder, setSortOrder] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/category/all');
            setCategories(res.data || []);
            setError('');
        } catch (err) {
            console.error('Lỗi khi lấy dữ liệu:', err.message);
            setError('Không thể lấy danh mục.');
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            fetchCategories();
            return;
        }
        try {
            const res = await axios.get(`http://localhost:3001/api/category/search?name=${encodeURIComponent(searchTerm)}`);
            setCategories(res.data || []);
            setError('');
        } catch (err) {
            console.error('Lỗi khi tìm kiếm danh mục:', err.message);
            setError('Không tìm thấy danh mục phù hợp.');
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError('Tên danh mục không được để trống');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            if (selectedFile) {
                formData.append('image', selectedFile);
            }

            if (editingId) {
                await axios.put(`http://localhost:3001/api/category/update/${editingId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEditingId(null);
            } else {

                await axios.post('http://localhost:3001/api/category/create', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            setName('');
            setDescription('');
            setSelectedFile(null);
            setError('');
            fetchCategories();
        } catch (err) {
            console.error('Lỗi khi lưu danh mục:', err.message);
            setError('Lỗi khi lưu danh mục');
        }
    };
    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa danh mục này không?')) return;

        try {
            await axios.delete(`http://localhost:3001/api/category/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchCategories();
            setError('');
        } catch (err) {
            console.error('Lỗi khi xóa danh mục:', err.message);
            setError('Lỗi khi xóa danh mục');
        }
    };
    const handleSort = async (order) => {
        try {
            const res = await axios.get(`http://localhost:3001/api/category/sort?order=${order}`);
            setCategories(res.data || []);
            setError('');
        } catch (err) {
            console.error('Lỗi khi sắp xếp danh mục:', err.message);
            setError('Lỗi khi sắp xếp danh mục');
        }
    };
    useEffect(() => {
        handleSort(sortOrder);
    }, [sortOrder]);

    const handleEdit = (category) => {
        setEditingId(category._id);
        setName(category.name);
        setDescription(category.description || '');
        setSelectedFile(null);
    };
    const handleCancelEdit = () => {
        setEditingId(null);
        setName('');
        setDescription('');
        setSelectedFile(null);
        setError('');
    };
    return (
        <div className="category-admin-container">
            <h2>Quản lý danh mục</h2>
            <div className="search-container">
                <div className='search__admin-category'>
                    <input
                        type="text"
                        placeholder="Nhập tên cần tìm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearch(); } }}
                    />
                    <button type="button" onClick={handleSearch}>Tìm kiếm</button>

                </div>
                <div className="sort-container">
                    <label htmlFor="sortOrder">Sắp xếp theo tên</label>
                    <select
                        id="sortOrder"
                        value={sortOrder}
                        onChange={(e) => {
                            setSortOrder(e.target.value);
                        }}
                    >
                        <option value="asc">Tăng dần (A-Z)</option>
                        <option value="desc">Giảm dần (Z-A)</option>
                    </select>
                </div>

            </div>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="category-form" encType="multipart/form-data">
                <input
                    type="text"
                    placeholder="Tên danh mục"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Mô tả (tuỳ chọn)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                {editingId && (
                    <>
                        {categories.find((cat) => cat._id === editingId)?.image && (
                            <img
                                src={categories.find((cat) => cat._id === editingId).image}
                                alt="Ảnh danh mục"
                                style={{ width: '120px', margin: '10px 0' }}
                            />
                        )}
                    </>
                )}

                <button type="submit">{editingId ? 'Cập nhật' : 'Thêm mới'}</button>
                {editingId && (
                    <button type="button" onClick={handleCancelEdit} className="cancel-btn">
                        Hủy
                    </button>
                )}
            </form>
            <ul className="category-list">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <li key={category._id} className="category-item">
                            <div onClick={() => handleEdit(category)} style={{ cursor: 'pointer' }}>
                                <strong>{category.name}</strong><br />
                                <small>{category.description}</small>
                                {category.image && (
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        style={{ width: '60px', display: 'block', marginTop: 5 }}
                                    />
                                )}
                            </div>
                            <button onClick={() => handleDelete(category._id)} className="delete-btn">
                                Xóa
                            </button>
                        </li>
                    ))
                ) : (
                    <li>Không có danh mục nào.</li>
                )}
            </ul>
        </div>
    );
};
