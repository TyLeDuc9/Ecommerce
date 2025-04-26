import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productData from '../../src/assets/data/product'; // Đảm bảo nhập đúng file

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [product, setProducts] = useState([]);

    const fetchProduct = async () => {
        setProducts(productData);
    };

    useEffect(() => {
        fetchProduct();
    }, []);

 
    const value = { navigate, product };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
