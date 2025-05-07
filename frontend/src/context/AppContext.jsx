import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [seller, setSeller] = useState(null);
  const [product, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);


  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
    }
  }, [cartItems]); 


  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/category/all');
      setCategories(res.data || []);
    } catch (error) {
      console.error('Lỗi khi lấy danh mục:', error.message);
    }
  };

  const addToCart = async (product, quantity) => {
    try {
      const storedCustomer = JSON.parse(localStorage.getItem('customer'));
      const customerId = storedCustomer?._id || storedCustomer?.id;
      if (!customerId) {
        alert("Không xác định được người dùng. Vui lòng đăng nhập lại.");
        return;
      }

      setCartItems(prev => {
        const existingItem = prev.find(item => item.productId === product._id);
        if (existingItem) {
          return prev.map(item =>
            item.productId === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [
            ...prev,
            {
              productId: product._id,
              quantity,
              productName: product.name,
              productImage: product.image?.[0],
              productPrice: product.price
            }
          ];
        }
      });

      await axios.post('http://localhost:3003/api/cart/create', {
        productId: product._id,
        quantity,
        customerId
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

    } catch (error) {
      console.log(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get('http://localhost:4003/api/product/all');
      setProducts(res.data.products || []);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();

    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      const customerData = JSON.parse(storedCustomer);
      setCustomer(customerData);
      if (customerData.role === 'seller') {
        setSeller(customerData);
      }
    }
  }, []);

  const value = {
    navigate,
    product,
    cartItems,
    setCartItems,
    addToCart,
    customer,
    seller,
    setCustomer,
    setSeller,
    categories
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
