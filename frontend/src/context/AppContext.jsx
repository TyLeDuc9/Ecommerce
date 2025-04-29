import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productData from '../../src/assets/data/product';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [product, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (productId, quantity) => {
        setCartItems(prev => {
            const exist = prev.find(item => item.productId === productId);
            if (exist) {
                return prev.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prev, { productId, quantity }];
            }
        });
    };

    const fetchProduct = async () => {
        setProducts(productData);
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const value = { navigate, product, cartItems, setCartItems, addToCart };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
