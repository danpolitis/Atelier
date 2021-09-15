import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import RatingBar from './Review-Components/RatingBar.jsx';
import Star from './Review-Components/Star.jsx';
import Characteristics from './Review-Components/Characteristics.jsx';
import ReviewsList from './Review-Components/ReviewsList.jsx';
import {
  reviewReducers, FETCH_SUCCESS, GET_RECOMMEND, ERROR,
} from './Review-Components/Review-Reducers/reducers.jsx';

const initialState = {
  ratings: {},
  average: 5,
  recommend: 0,
  totalRatings: 0,
  base: 0,
  isError: false,
};

function Reviews({ productId }) {
  const [state, dispatch] = useReducer(reviewReducers, initialState);

  const getMetaData = (id) => {
    axios.get(`/api/reviews/meta?product_id=${id}`)
      .then(({ data }) => {
        dispatch({ type: GET_RECOMMEND, payload: data.recommended });
        dispatch({ type: FETCH_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: ERROR });
      });
  };

  useEffect(() => {
    getMetaData(productId);
  }, [productId]);
  return (
    <div className="container mb-5">
      <h5>Ratings & Reviews</h5>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <p className="average-score">
              {(Math.round(state.average * 10) / 10)}
            </p>
            <Star average={(Math.round(state.average * 4) / 4).toFixed(2)} />
            <p className="recommended">
              {Math.round(state.recommend)}
              % of reviews recommend this product
            </p>
            <RatingBar total={state.totalRatings} ratings={state.ratings} />
            <Characteristics productId={productId} />
          </div>
          <div className="col-md-8">
            <ReviewsList totalRatings={state.totalRatings} productId={productId} />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Reviews;
