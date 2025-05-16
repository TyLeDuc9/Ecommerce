  import { createContext, useContext, useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';

  export const AppContext = createContext();

  export const AppContextProvider = ({ children }) => {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [seller, setSeller] = useState(null);
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
    const fetchSellerByUserId = async (userId) => {
      try {
        const res = await axios.get(`http://localhost:3006/api/seller/by-user/${userId}`);
        console.log("Seller response:", res.data);

        const sellerData = res.data;

        if (sellerData && sellerData._id) {
          setSeller(sellerData);
          localStorage.setItem('sellerId', sellerData._id);
        } else {
          console.warn("Không có sellerId trong dữ liệu phản hồi");
        }
      } catch (error) {
        console.error("Không thể lấy seller từ userId:", error.message);
      }
    };

    useEffect(() => {
      fetchProducts();
      fetchCategories();
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

    }, []);

    useEffect(() => {
      if (user && user.role === 'seller') {
        fetchSellerByUserId(user._id || user.id);
      } else {
        setSeller(null);
        localStorage.removeItem('sellerId');
      }
    }, [user]);

    const handleLogin = (userData, token) => {
      console.log('handleLogin nhận userData:', userData);
      setUser(userData);
      setToken(token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      if (userData.role === 'seller') {
        fetchSellerByUserId(userData._id || userData.id);
      }
    };

    const handleLogout = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('sellerId');

    };
    const handleSellerLogin = (userData, token) => {
      setSeller(userData);
      setUser(userData);
      setToken(token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
    };


    const handleSellerLogout = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      clearSellerFormData();
    };
    const handleAdminLogin = (userData, token) => {
      setUser(userData);
      setToken(token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
    };
    const handleAdminLogout = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    };


    const clearSellerFormData = () => {
      localStorage.removeItem('storeName');
      localStorage.removeItem('storeAddress');
      localStorage.removeItem('phone');
      localStorage.removeItem('images');
    };

    const value = {
      categories,
      setCategories,
      products,
      setProducts,
      user,
      setUser,
      token,
      handleLogin,
      handleLogout,
      seller,
      setSeller,
      handleSellerLogin,
      handleSellerLogout,
      handleAdminLogin,
      handleAdminLogout
    };


    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    );
  };

  export const useAppContext = () => useContext(AppContext);
