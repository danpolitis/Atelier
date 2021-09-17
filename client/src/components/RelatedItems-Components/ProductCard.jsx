import React from 'react';
import { Card } from 'react-bootstrap';
import CompareModal from './CompareModal.jsx';

const ProductCard = ({ product, currentFeatures, onClick }) => {
  const displayUrl = product.photo === null ? 'No-Image-Placeholder.svg' : product.photo;
  return (
    <Card
      key={product.id}
      style={{
        width: '14rem', marginRight: '20px', border: 'solid', borderWidth: 'thin', position: 'realtive',
        cursor: 'pointer',
      }}
    >
      <CompareModal
        product={product}
        currentFeatures={currentFeatures}
      />
      <Card.Img onClick={() => onClick(product.id)} variant="top" src={displayUrl} style={{ height: '225px', objectFit: 'cover' }} />
      <Card.Body onClick={() => onClick(product.id)} style={{ padding: '4px' }}>
        <Card.Title style={{ fontSize: '13px', padding: '4px' }}>{product.category}</Card.Title>
        <Card.Title style={{ fontSize: '15px', padding: '4px' }}>{product.name}</Card.Title>
        <Card.Text style={{ fontSize: '10px', padding: '4px' }}>
          $
          {product.default_price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
