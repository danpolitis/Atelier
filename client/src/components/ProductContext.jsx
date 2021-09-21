import React, { useState, createContext, useEffect } from 'react';
import getProductInfo from './RequestHandlers/getProductInfo.jsx';
import getProductStyles from './RequestHandlers/getProductStyles.jsx';
import { getAverageRating, getAllReviews } from './RequestHandlers/getReviewInfo.jsx';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productId, setProductId] = useState(42366);
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState({});
  const [averageRating, setaverageRating] = useState(0);

  useEffect(() => {
    getProductInfo(productId, (results) => {
      setProductInfo(results);
    });
    getProductStyles(productId, (results) => {
      setProductStyles(results);
    });
    getAverageRating(productId, (results) => {
      setaverageRating(results);
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
        averageRating,
        getAllReviews,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
