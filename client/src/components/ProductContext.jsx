import React, { useState, createContext, useEffect } from 'react';
import getProductInfo from './RequestHandlers/getProductInfo.jsx';
import getProductStyles from './RequestHandlers/getProductStyles.jsx';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productId, setProductId] = useState(42368);
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState({});

  useEffect(() => {
    getProductInfo(productId, (results) => {
      setProductInfo(results);
    });
    getProductStyles(productId, (results) => {
      setProductStyles(results);
    });
  }, [productId]);

  return (
    <ProductContext.Provider
      value={{
        productId,
        setProductId,
        productInfo,
        setProductInfo,
        productStyles,
        setProductStyles,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
