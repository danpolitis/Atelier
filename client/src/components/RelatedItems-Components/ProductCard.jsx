import React, { useContext, useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import CompareModal from './CompareModal.jsx';

const ProductCard = ({
  product, currentFeatures, onClick, type, removeOutfitItem,
}) => {
  const displayUrl = product.photo === null ? 'No-Image-Placeholder.svg' : product.photo;
  const [currentAverage, setCurrentAverage] = useState(0);
  const getAverageRating = (id, callback) => {
    axios.get(`/api/reviews/meta?product_id=${id}`)
      .then(({ data }) => {
        const average = Object.values(data.ratings)
          .reduce((r, a, i) => (Number(r) + Number(a)
          * Number(Object.keys(data.ratings)[i])))
          / Object.values(data.ratings)
            .reduce((prev, curr) => Number(prev) + Number(curr)) || 0;
        callback(average);
      })
      .catch((err) => {
        callback(err);
      });
  };
  useEffect(() => {
    getAverageRating(product.id, (results) => {
      setCurrentAverage(results);
    });
  }, []);

  const renderActionButton = () => {
    if (type === 'outfit') {
      return (
        <Button
          style={{
            zIndex: 1, position: 'absolute', right: '10px', top: '10px', paddingBottom: '8px',
          }}
          variant="dark"
          onClick={(e) => { removeOutfitItem(product.id, e); }}
        >
          <img src='x.svg'></img>
        </Button>
      );
    }
    return (
      <CompareModal
        product={product}
        currentFeatures={currentFeatures}
      />
    );
  };

  return (
    <Card
      key={product.id}
      style={{
        width: '14rem',
        marginRight: '20px',
        border: 'solid',
        borderWidth: 'thin',
        position: 'realtive',
        cursor: 'pointer',
      }}
    >
      {renderActionButton()}
      <Card.Img onClick={(e) => onClick(product.id, e)} variant="top" src={displayUrl} style={{ height: '225px', objectFit: 'cover' }} />
      <Card.Body onClick={(e) => onClick(product.id, e)} style={{ padding: '4px' }}>
        <Card.Title style={{ fontSize: '13px', padding: '4px' }}>{product.category}</Card.Title>
        <Card.Title style={{ fontSize: '15px', padding: '4px' }}>{product.name}</Card.Title>
        <StarRatings starSpacing="2px" rating={Number(currentAverage) || 0} starRatedColor="rgb(0,0,0)" numberOfStars={5} starDimension="15px" />
        <Card.Text style={{ fontSize: '10px', padding: '4px' }}>
          $
          {product.default_price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
