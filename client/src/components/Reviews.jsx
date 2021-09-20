import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import RatingBar from './Review-Components/RatingBar.jsx';
import Star from './Review-Components/Star.jsx';
import Characteristics from './Review-Components/Characteristics.jsx';
import ReviewsList from './Review-Components/ReviewsList.jsx';
import {
  reviewReducers, initialState, FETCH_SUCCESS, GET_RECOMMEND, ERROR, GET_CHARACTERISTICS,
} from './Review-Components/Review-Reducers/reducers.jsx';

function Reviews({ productId }) {
  const [state, dispatch] = useReducer(reviewReducers, initialState);
  const [size, setSize] = useState(0);
  const [comfort, setComfort] = useState(0);

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
        if (data.characteristics.Comfort.value === null) {
          setComfort(0);
        } else {
          setComfort(data.characteristics.Comfort.value);
        }
        if ((!data.characteristics.Fit && !data.characteristics.Size.value) ||
        (!data.characteristics.Size && !data.characteristics.Fit.value)) {
          setSize(0);
        } else {
          setSize(data.characteristics.Fit.value || data.characteristics.Size.value);
        }
      })
      .catch((err) => {
        console.log(err);
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
            <Characteristics size={size} comfort={comfort} productId={productId} />
          </div>
          <div className="col-md-8">
            <ReviewsList
              characteristics={state.characteristics}
              totalRatings={state.totalRatings}
              productId={productId}
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
