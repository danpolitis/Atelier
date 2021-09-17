import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from './RelatedItems-Components/Carousel.jsx';
import ProductCard from './RelatedItems-Components/ProductCard.jsx';
import AddToOutfitCard from './RelatedItems-Components/AddToOutfitCard.jsx';

function RelatedItems({ productId, setProductId }) {
  const [relatedListData, setRelatedListData] = useState([]);
  const [relatedStyleData, setRelatedStyleData] = useState([]);
  const [mergedRelatedData, setMergedRelatedData] = useState([]);
  const [outfitIds, setOutfitIds] = useState([42567]);
  const [outfitListData, setOutfitListData] = useState([]);
  const [outfitStyleData, setOutfitStyleData] = useState([]);
  const [mergedOutfitData, setMergedOutfitData] = useState([]);
  const [currentFeatures, setCurrentFeatures] = useState([]);

  const getItemData = (relatedId) => (axios.get(`/api/products/${relatedId}`)
    .then(({ data }) => (data)))
    .catch((err) => (console.log(err)));

  const getStyleData = (relatedId) => (axios.get(`/api/products/${relatedId}/styles`)
    .then(({ data }) => (data.results[0].photos[0].url)))
    .catch((err) => (console.log(err)));

  const getAllData = (idList, isRelatedData) => {
    const dataPromises = idList.map((item) => (getItemData(item)));
    const stylePromises = idList.map((item) => (getStyleData(item)));
    (Promise.all(dataPromises))
      .then((results) => {
        if (isRelatedData === true) {
          setRelatedListData(results);
        } else {
          setOutfitListData(results);
        }
      });
    (Promise.all(stylePromises))
      .then((results) => {
        if (isRelatedData === true) {
          setRelatedStyleData(results);
        } else {
          setOutfitStyleData(results);
        }
      });
  };

  const zipData = (infoData, styleData, isRelatedData) => {
    const data = infoData.map((item, i) => {
      item.photo = styleData[i];
      return item;
    });
    if (isRelatedData === true) {
      setMergedRelatedData(data);
    } else {
      setMergedOutfitData(data);
    }
  };

  const addToOutfit = () => {
    if (outfitIds.indexOf(productId) === -1) {
      const newIds = outfitIds.concat(productId);
      setOutfitIds(newIds);
    }
  };

  const getCurrentProductFeatures = (id) => {
    axios.get(`/api/products/${id}`)
      .then((productData) => {
        const { features } = productData.data;
        setCurrentFeatures(features);
      });
  };

  const getRelatedItems = (id) => {
    axios.get(`/api/products/${id}/related`)
      .then(({ data }) => {
        getAllData(data, true);
      })
      .catch((err) => console.log(err));
  };

  const changeCurrentItem = (id) => {
    setProductId(id);
  };

  useEffect(() => {
    getRelatedItems(productId);
    getAllData(outfitIds);
    zipData(outfitListData, outfitStyleData, false);
    getCurrentProductFeatures(productId);
  }, []);

  useEffect(() => {
    getRelatedItems(productId);
  }, [productId]);

  useEffect(() => {
    getAllData(outfitIds);
  }, [outfitIds]);

  useEffect(() => {
    zipData(relatedListData, relatedStyleData, true);
  }, [relatedStyleData, relatedListData]);

  useEffect(() => {
    zipData(outfitListData, outfitStyleData, false);
  }, [outfitStyleData, outfitListData]);

  return (
    <div className="container mb-5">
      <div style={{
        maxWidth: 900, marginLeft: '0', marginRight: 'auto', marginTop: 64,
      }}
      >
        {' '}
        RELATED PRODUCTS
        <Carousel show={3}>
          {mergedRelatedData.map((product) => (
            <ProductCard
              onClick={changeCurrentItem}
              key={product.id}
              product={product}
              currentFeatures={currentFeatures}
            />
          ))}
        </Carousel>
      </div>
      <div
        style={{
          maxWidth: 900, marginLeft: '0', marginRight: 'auto', marginTop: 64,
        }}
      >
        {' '}
        MY OUTFIT
        <Carousel show={3}>
          <AddToOutfitCard addToOutfit={addToOutfit} />
          {mergedOutfitData.map((product) => (
            <ProductCard
              onClick={changeCurrentItem}
              key={product.id}
              product={product}
              currentFeatures={currentFeatures}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
export default RelatedItems;
