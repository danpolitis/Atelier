import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import ReviewListEntry from './ReviewListEntry.jsx';
import {
  reviewListReducer, FETCH_SUCCESS, IS_LOADING, SET_COUNT, SORT_CLICK, SELECT_CHANGE,
} from './Review-Reducers/reviewsReducer.jsx';

const initialState = {
  reviews: [],
  count: 2,
  isLoading: false,
  sortClick: false,
  selected: 'relevant',
};

const ReviewsList = ({ productId, totalRatings }) => {
  const [state, dispatch] = useReducer(reviewListReducer, initialState);

  const getReviews = (id, count) => {
    axios.get(`/api/reviews?product_id=${id}&count=${count}&sort=${state.selected}`)
      .then(({ data }) => {
        dispatch({ type: FETCH_SUCCESS, payload: data.results });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: IS_LOADING });
      });
  };

  const handleChange = (e) => {
    dispatch({ type: SELECT_CHANGE, payload: e.target.value });
    dispatch({ type: SORT_CLICK });
  };

  useEffect(() => {
    getReviews(productId, state.count);
  }, [productId, state.count, state.selected]);

  return (
    <>
      <div className="review-sort">
        <p className="review-sort-font">
          {`${totalRatings} reviews, sorted by`}
        </p>
        <form onChange={handleChange}>
          <div className="form-group">
            <select className="styled-select">
              <option value="relevant">relevance</option>
              <option value="helpful">helpful</option>
              <option value="newest">newest</option>
            </select>
          </div>
        </form>
      </div>
      <div>
        {state.reviews.map((review) => (
          <ReviewListEntry
            productId={productId}
            count={state.count}
            getReviews={getReviews}
            key={review.review_id}
            review={review}
            selected={state.selected}
          />
        ))}
        {(totalRatings >= 2 && totalRatings >= state.count)
          ? (
            <div className="btn-toolbar pull-right">
              <button onClick={() => { dispatch({ type: SET_COUNT }); }} type="button" className="btn btn-outline-dark w-30 p-3">MORE REVIEWS</button>
              <button type="button" className="btn btn-outline-dark w-30 p-3" data-toggle="modal" data-target="#exampleModalCenter">ADD A REVIEW +</button>
            </div>
          ) : <div><p>End of Page</p></div>}
      </div>
    </>
  );
};

export default ReviewsList;
