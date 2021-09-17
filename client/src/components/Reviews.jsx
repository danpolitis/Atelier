import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import RatingBar from './Review-Components/RatingBar.jsx';
import Star from './Review-Components/Star.jsx';
import Characteristics from './Review-Components/Characteristics.jsx';
import ReviewsList from './Review-Components/ReviewsList.jsx';
import {
  reviewReducers, initialState, FETCH_SUCCESS, GET_RECOMMEND, ERROR,
  GET_PRODUCT_INFO, GET_CHARACTERISTICS,
} from './Review-Components/Review-Reducers/reducers.jsx';

function Reviews({ productId }) {
  const [state, dispatch] = useReducer(reviewReducers, initialState);

  const getMetaData = (id) => {
    axios.get(`/api/reviews/meta?product_id=${id}`)
      .then(({ data }) => {
        if (Object.keys(data.ratings).length === 0) {
          dispatch({ type: ERROR });
          dispatch({ type: GET_CHARACTERISTICS, payload: data });
          dispatch({ type: GET_RECOMMEND, payload: data.recommended });
        } else {
          dispatch({ type: FETCH_SUCCESS, payload: data });
          dispatch({ type: GET_CHARACTERISTICS, payload: data });
          dispatch({ type: GET_RECOMMEND, payload: data.recommended });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: ERROR });
      });
  };
  const getProductInfo = (id) => {
    axios.get(`/api/products/${id}`)
      .then(({ data }) => {
        dispatch({ type: GET_PRODUCT_INFO, payload: data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: ERROR });
      });
  };

  useEffect(() => {
    getMetaData(productId);
    getProductInfo(productId);
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
            <ReviewsList
              characteristics={state.characteristics}
              totalRatings={state.totalRatings}
              productId={productId}
              productName={state.productInfo.name}
              sizefit={state.characteristics.Fit || state.characteristics.Size}
              widthlength={state.characteristics.Length || state.characteristics.Width}
            />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Reviews;
