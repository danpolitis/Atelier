import React from 'react';
import { Card, Button } from 'react-bootstrap';

const AddToOutfitCard = ({ addToOutfit }) => (
  <Card
    style={{
      width: '14rem', marginRight: '20px', border: 'solid', borderWidth: 'thin',
    }}
  >
    <Card.Body
      style={{ padding: '4px', paddingTop: '135px', height: '350px' }}
      className="m-auto"
    >
      <Card.Title style={{ fontSize: '13px', padding: '4px' }}>Add to Outfit</Card.Title>
      <Button onClick={addToOutfit} style={{ marginLeft: '24px' }} variant="secondary">+</Button>
      {' '}
    </Card.Body>
  </Card>
);

export default AddToOutfitCard;
