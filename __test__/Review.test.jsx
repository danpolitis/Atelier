import React from 'react';
import ReactDOM from 'react-dom';
import App from '../client/src/components/App.jsx';
import app from '../server/app.js';
import Reviews from '../client/src/components/Reviews.jsx';
import ValidationMessage from '../client/src/components/Review-Components/ReviewForm/ValidationMessage.jsx';
import ReviewListEntry from '../client/src/components/Review-Components/ReviewListEntry.jsx';
import { ProductProvider } from '../client/src/components/ProductContext.jsx';

const reviewData = {
  review_id: 681771,
  rating: 5,
  summary: 'This product was great!',
  recommend: true,
  response: '',
  body: 'I really did or did not like this product based on whether it was sustainably sourced. Then I found out that its made from nothing at all.',
  date: '2019-01-01T00:00:00.000Z',
  reviewer_name: 'funtime',
  helpfulness: 19,
  photos: [],
};

const formState = {
  selectedRating: 0,
  summaryText: '',
  bodyText: '',
  selectRec: false,
  addUsername: '',
  addEmail: '',
  addPhotos: [],
  fit: 0,
  size: 0,
  length: 0,
  width: 0,
  quality: 0,
  comfort: 0,
};

it('renders Reviews without crashing', () => {
  const div = document.createElement('div');
  const productId = 42366;
  ReactDOM.render(<ProductProvider><Reviews productId={productId} /></ProductProvider>, div);
});

it('renders App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProductProvider><App /></ProductProvider>, div);
});

it('renders ReviewListEntry without crashing', () => {
  const div = document.createElement('div');
  const productId = 42366;

  ReactDOM.render(
    <ProductProvider>
      <ReviewListEntry
        productId={productId}
        count={2}
        key={681771}
        review={reviewData}
        selected="relevance"
      />
    </ProductProvider>, div,
  );
});

it('renders ValidationMessage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProductProvider><ValidationMessage state={formState} /></ProductProvider>, div);
});
