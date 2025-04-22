import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import product from '../../src/assets/data/product'
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate=useNavigate();
    // const fetchProduct=async()=>{
    //     setProducts(product)
    // }
    // useEffect(()=>{
    //     fetchProduct()

    // }, [])
    

    const value = {navigate, product}; 
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
