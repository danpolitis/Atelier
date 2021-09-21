import React, { useState, createContext, useEffect } from 'react';
import getProductInfo from './RequestHandlers/getProductInfo.jsx';
import getProductStyles from './RequestHandlers/getProductStyles.jsx';
import { getAverageRating, getAllReviews } from './RequestHandlers/getReviewInfo.jsx';
import postInteractions from './RequestHandlers/postInteractions.jsx';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productId, setProductId] = useState(42366);
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState({});
  const [averageRating, setaverageRating] = useState(0);
  const [recordInteraction, setRecordInteraction] = useState({});

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

  useEffect(() => {
    if (Object.keys(recordInteraction).length !== 0) {
      postInteractions(recordInteraction);
    }
  }, [recordInteraction]);

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
        setRecordInteraction,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
