import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/category/all');
      setCategories(res.data || []);
    } catch (error) {
      console.error('Lỗi khi lấy danh mục:', error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:4003/api/product/all');
      setProducts(res.data.products || []);
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error.message);
    }
  };

  useEffect(() => {
  fetchProducts();
  fetchCategories();
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);  // Chỉ chạy khi component mount


  const handleLogin = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    categories,
    setCategories,
    products,
    setProducts,
    user,
    token,
    handleLogin,
    handleLogout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
