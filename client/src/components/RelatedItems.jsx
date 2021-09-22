import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import axios from 'axios';
import Carousel from './RelatedItems-Components/Carousel.jsx';
import ProductCard from './RelatedItems-Components/ProductCard.jsx';
import AddToOutfitCard from './RelatedItems-Components/AddToOutfitCard.jsx';
import { ProductContext } from './ProductContext.jsx';

function RelatedItems({ productId, setProductId }) {
  const [relatedListData, setRelatedListData] = useState([]);
  const [relatedStyleData, setRelatedStyleData] = useState([]);
  const [mergedRelatedData, setMergedRelatedData] = useState([]);
  const [outfitListData, setOutfitListData] = useState([]);
  const [outfitStyleData, setOutfitStyleData] = useState([]);
  const [mergedOutfitData, setMergedOutfitData] = useState([]);
  const [currentFeatures, setCurrentFeatures] = useState([]);

  const previousRelatedValues = useRef({ relatedListData, relatedStyleData });
  const previousOutfitValues = useRef({ outfitListData, outfitStyleData });

  const { setRecordInteraction, outfitIds, setOutfitIds } = useContext(ProductContext);

  const getItemData = (relatedId) => (axios.get(`/api/products/${relatedId}`)
    .then(({ data }) => (data)))
    .catch((err) => (console.log(err)));

  const getStyleData = (relatedId) => (axios.get(`/api/products/${relatedId}/styles`)
    .then(({ data }) => (data.results[0].photos[0].url || null)))
    .catch((err) => (console.log(err)));

  const zipData = (infoData, styleData, isRelatedData) => {
    const data = infoData.map((item, i) => {
      const newItem = item;
      newItem.photo = styleData[i];
      return newItem;
    });
    if (isRelatedData === true) {
      setMergedRelatedData(data);
    } else {
      setMergedOutfitData(data);
    }
  };

  const getAllData = (idList, isRelatedData) => {
    const idSet = new Set(idList);
    const idArray = Array.from(idSet);
    const dataPromises = idArray.map((item) => (getItemData(item)));
    const stylePromises = idArray.map((item) => (getStyleData(item)));
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

  const addToOutfit = (e) => {
    if (outfitIds.indexOf(productId) === -1) {
      const newIds = outfitIds.concat(productId);
      setOutfitIds(newIds);
    }
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'RelatedItems',
      time: new Date(),
    });
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

  const changeCurrentItem = (id, e) => {
    setProductId(id);
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'RelatedItems',
      time: new Date(),
    });
  };

  const removeOutfitItem = (id, e) => {
    const index = outfitIds.indexOf(id);
    const outfit = outfitIds.slice(0, index).concat(outfitIds.slice(index + 1, outfitIds.length));
    setOutfitIds(outfit);
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'RelatedItems',
      time: new Date(),
    });
  };

  useEffect(() => {
    getCurrentProductFeatures(productId);
    if (JSON.parse(window.localStorage.getItem('outfitIds')) === null) {
      window.localStorage.setItem('outfitIds', JSON.stringify(outfitIds));
      setOutfitIds(JSON.parse(window.localStorage.getItem('outfitIds')));
    } else {
      setOutfitIds(JSON.parse(window.localStorage.getItem('outfitIds')));
    }
  }, []);

  useEffect(() => {
    getRelatedItems(productId);
  }, [productId]);

  useEffect(() => {
    window.localStorage.setItem('outfitIds', JSON.stringify(outfitIds));
    getAllData(outfitIds);
  }, [outfitIds]);

  useEffect(() => {
    if (JSON.stringify(previousRelatedValues.relatedListData) !== JSON.stringify(relatedListData)
    && JSON.stringify(previousRelatedValues.relatedStyleData) !== JSON.stringify(relatedStyleData)
    ) {
      zipData(relatedListData, relatedStyleData, true);
    }
  }, [relatedListData, relatedStyleData]);

  useEffect(() => {
    if (JSON.stringify(previousOutfitValues.outfitListData) !== JSON.stringify(outfitListData)
    && JSON.stringify(previousOutfitValues.outfitStyleData) !== JSON.stringify(outfitStyleData)
    ) {
      zipData(outfitListData, outfitStyleData, false);
    }
  }, [outfitListData, outfitStyleData]);

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
              type="related"
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
              type="outfit"
              removeOutfitItem={removeOutfitItem}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
export default RelatedItems;
