import React, {
  useEffect, useReducer, useState, useContext,
} from 'react';
import axios from 'axios';
import RatingBar from './Review-Components/RatingBar.jsx';
import Star from './Review-Components/Star.jsx';
import Characteristics from './Review-Components/Characteristics.jsx';
import ReviewsList from './Review-Components/ReviewsList.jsx';
import { ProductContext } from './ProductContext.jsx';
import {
  reviewReducers, initialState, FETCH_SUCCESS, GET_RECOMMEND, ERROR, GET_CHARACTERISTICS,
} from './Review-Components/Review-Reducers/reducers.jsx';
import {
  reviewListReducer, initState, FETCH_REVIEW_SUCCESS, IS_LOADING, SET_COUNT,
  MODAL_CLICK, SELECT_CHANGE, SEARCH_RESULT,
} from './Review-Components/Review-Reducers/reviewsReducer.jsx';

const initialStarFilter = {
  5: false,
  4: false,
  3: false,
  2: false,
  1: false,
};

function Reviews({ productId, theme }) {
  const [state, dispatch] = useReducer(reviewReducers, initialState);
  const [reviewState, reviewDispatch] = useReducer(reviewListReducer, initState);
  const [size, setSize] = useState(0);
  const { getAllReviews, setRecordInteraction } = useContext(ProductContext);
  const [comfort, setComfort] = useState(0);
  const [starFilter, setStarFilter] = useState(initialStarFilter);

  const handleChange = (e) => {
    setStarFilter((prevState) => ({ ...prevState, [e.target.value]: !prevState[e.target.value] }));
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'Review and Rating',
      time: new Date(),
    });
  };

  const handleSortChange = (e) => {
    reviewDispatch({ type: SELECT_CHANGE, payload: e.target.value });
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'Review and Rating',
      time: new Date(),
    });
  };

  const handleModalClick = (e) => {
    reviewDispatch({ type: MODAL_CLICK });
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'Review and Rating',
      time: new Date(),
    });
  };

  const handleMoreReviews = (e) => {
    reviewDispatch({ type: SET_COUNT });
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'Review and Rating',
      time: new Date(),
    });
  };

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
        if ((!data.characteristics.Fit && !data.characteristics.Size?.value)
        || (!data.characteristics.Size && !data.characteristics.Fit?.value)) {
          setSize(0);
        } else {
          setSize(data.characteristics.Fit?.value || data.characteristics.Size?.value);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: ERROR });
      });
  };

  const getReviews = (id, selected) => {
    getAllReviews(id, selected, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const reviewFilter = data.results.filter((review) => {
          if (starFilter[5] && (review.rating === 5)) {
            return review;
          }
          if (starFilter[4] && (review.rating === 4)) {
            return review;
          }
          if (starFilter[3] && (review.rating === 3)) {
            return review;
          }
          if (starFilter[2] && (review.rating === 2)) {
            return review;
          }
          if (starFilter[1] && (review.rating === 1)) {
            return review;
          }
          if (!starFilter[5] && !starFilter[4]
            && !starFilter[3] && !starFilter[2] && !starFilter[1]) {
            return review;
          }
        });
        reviewDispatch({ type: FETCH_REVIEW_SUCCESS, payload: reviewFilter || data.results });
        reviewDispatch({ type: SEARCH_RESULT, payload: data.results });
      }
    });
  };

  useEffect(() => {
    getMetaData(productId);
  }, [productId]);

  useEffect(() => {
    getReviews(productId, reviewState.selected);
  }, [productId, starFilter, reviewState.selected]);

  return (
    <div id="reviews" className="container mb-5">
      <h5>Ratings & Reviews</h5>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <p
              className="average-score"
              style={{
                float: 'left',
                marginRight: '4px',
                marginBottom: 0,
                fontSize: '50px',
                fontWeight: 'bold',
              }}
            >
              {(Math.round(state.average * 10) / 10)}
            </p>
            <Star theme={theme} average={(Math.round(state.average * 4) / 4).toFixed(2)} />
            <p className="recommended" style={{ marginTop: '40px', width: '100%', fontSize: 'small' }}>
              {Math.round(state.recommend)}
              % of reviews recommend this product
            </p>
            <RatingBar
              starFilter={starFilter}
              total={state.totalRatings}
              ratings={state.ratings}
              handleChange={handleChange}
              theme={theme}
            />
            <Characteristics size={size} comfort={comfort} productId={productId} />
          </div>
          <div className="col-md-8">
            <ReviewsList
              characteristics={state.characteristics}
              totalRatings={state.totalRatings}
              productId={productId}
              sizefit={state.characteristics.Fit || state.characteristics.Size}
              widthlength={state.characteristics.Length || state.characteristics.Width}
              handleSortChange={handleSortChange}
              handleModalClick={handleModalClick}
              handleMoreReviews={handleMoreReviews}
              reviews={reviewState.reviews}
              count={reviewState.count}
              getReviews={getReviews}
              selected={reviewState.selected}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Reviews;
