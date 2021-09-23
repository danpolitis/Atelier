/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
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

jest.mock('axios');

beforeEach(() => {
  const metaData = {
    product_id: '42366',
    ratings: {
      1: '3',
      2: '1',
      3: '12',
      4: '10',
      5: '14',
    },
    recommended: {
      false: '15',
      true: '25',
    },
    characteristics: {
      Fit: {
        id: 142032,
        value: '2.2727272727272727',
      },
      Length: {
        id: 142033,
        value: '2.3809523809523810',
      },
      Comfort: {
        id: 142034,
        value: '3.2000000000000000',
      },
      Quality: {
        id: 142035,
        value: '2.9500000000000000',
      },
    },
  };
  axios.get.mockResolvedValue(metaData);
});

<<<<<<< HEAD
// it('renders App without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<ProductProvider><App /></ProductProvider>, div);
// });
=======
it('renders Reviews without crashing', () => {
  const div = document.createElement('div');
  const productId = 42366;
  act(() => {
    ReactDOM.render(<ProductProvider><Reviews productId={productId} /></ProductProvider>, div);
  });
});
>>>>>>> 50536776c79efaf8e1c8fd64d76564028364c143

it('renders ReviewListEntry without crashing', () => {
  const div = document.createElement('div');
  const productId = 42366;

  act(() => {
    ReactDOM.render(
      <ProductProvider>
        <ReviewListEntry
          productId={productId}
          count={2}
          key={681771}
          review={reviewData}
          selected="relevance"
        />
      </ProductProvider>,
      div,
    );
  });
});

it('renders ValidationMessage without crashing',  () => {
  const div = document.createElement('div');
  act(() => {
    ReactDOM.render(
      <ValidationMessage state={formState} />, div,
    );
  });
});
