import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import Carousel from './RelatedItems-Components/Carousel.jsx';

function RelatedItems({ productId, setProductId }) {
  const [relatedListData, setRelatedListData] = useState([]);
  const [relatedStyleData, setRelatedStyleData] = useState([]);
  const [mergedRelatedData, setMergedRelatedData] = useState([]);
  const [outfitIds, setOutfitIds] = useState([42567]);
  const [outfitListData, setOutfitListData] = useState([]);
  const [outfitStyleData, setOutfitStyleData] = useState([]);
  const [mergedOutfitData, setMergedOutfitData] = useState([]);

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

  const getRelatedItems = (id) => {
    axios.get(`/api/products/${id}/related`)
      .then(({ data }) => {
        getAllData(data, true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRelatedItems(productId);
    getAllData(outfitIds);
    zipData(outfitListData, outfitStyleData, false);
  }, []);

  useEffect(() => {
    getAllData(outfitIds);
  }, [outfitIds]);

  useEffect(() => {
    zipData(relatedListData, relatedStyleData, true);
  }, [relatedStyleData]);

  useEffect(() => {
    zipData(outfitListData, outfitStyleData, false);
  }, [outfitStyleData, outfitListData]);

  return (
    <div className="container">
      <div style={{
        maxWidth: 900, marginLeft: '0', marginRight: 'auto', marginTop: 64,
      }}
      >
        {' '}
        RELATED PRODUCTS
        <Carousel show={3}>
          {mergedRelatedData.map((product) => (
            <Card
              key={product.id}
              style={{
                width: '14rem', marginRight: '20px', border: 'solid', borderWidth: 'thin',
              }}
            >
              <Card.Img variant="top" src={product.photo} style={{ height: '225px' }} />
              <Card.Body style={{ padding: '4px' }}>
                <Card.Title style={{ fontSize: '13px', padding: '4px' }}>{product.category}</Card.Title>
                <Card.Title style={{ fontSize: '15px', padding: '4px' }}>{product.name}</Card.Title>
                <Card.Text style={{ fontSize: '10px', padding: '4px' }}>
                  $
                  {product.default_price}
                </Card.Text>
              </Card.Body>
            </Card>
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
          <Card
            style={{
              width: '14rem', marginRight: '20px', border: 'solid', borderWidth: 'thin',
            }}
          >
            <Card.Body
              style={{ padding: '4px', paddingTop: '120px' }}
              className="m-auto"
            >
              <Card.Title style={{ fontSize: '13px', padding: '4px' }}>Add to Outfit</Card.Title>
              <Button onClick={addToOutfit} style={{ marginLeft: '24px' }} variant="secondary">+</Button>
              {' '}
            </Card.Body>
          </Card>
          {mergedOutfitData.map((product) => (
            <Card
              key={product.id}
              style={{
                width: '14rem', marginRight: '20px', border: 'solid', borderWidth: 'thin',
              }}
            >
              <Card.Img variant="top" src={product.photo} style={{ height: '225px' }} />
              <Card.Body style={{ padding: '4px' }}>
                <Card.Title style={{ fontSize: '13px', padding: '4px' }}>{product.category}</Card.Title>
                <Card.Title style={{ fontSize: '15px', padding: '4px' }}>{product.name}</Card.Title>
                <Card.Text style={{ fontSize: '10px', padding: '4px' }}>
                  $
                  {product.default_price}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
export default RelatedItems;
