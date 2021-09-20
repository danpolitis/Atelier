import React, { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ReviewListEntry from './ReviewListEntry.jsx';
import AddReview from './ReviewForm/AddReview.jsx';
import {
  reviewListReducer, initialState, FETCH_SUCCESS, IS_LOADING, SET_COUNT,
  MODAL_CLICK, SELECT_CHANGE, SEARCH_RESULT,
} from './Review-Reducers/reviewsReducer.jsx';

const ReviewsList = (props) => {
  const [state, dispatch] = useReducer(reviewListReducer, initialState);
  const [searchText, setsearchText] = useState('');
  const {
    productId, totalRatings, characteristics, sizefit, widthlength,
  } = props;

  const getReviews = (id, count, selected) => {
    axios.get(`/api/reviews?product_id=${id}&sort=${selected}&count=${count}`)
      .then(({ data }) => {
        dispatch({ type: FETCH_SUCCESS, payload: data.results });
        dispatch({ type: IS_LOADING });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchBar = () => (
    <div className="review-search">
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-2"
          aria-label="Search"
          value={searchText}
          onChange={(e) => setsearchText(e.target.value)}
        />
        <Button variant="outline-dark">Search</Button>
      </Form>
    </div>
  );

  useEffect(() => {
    getReviews(productId, state.count, state.selected);
  }, [productId, state.count, state.selected]);

  return (
    <>
      <div className="review-sort">
        <p className="review-sort-font">
          {`${totalRatings} reviews, sorted by`}
        </p>
        <form onChange={(e) => { dispatch({ type: SELECT_CHANGE, payload: e.target.value }); }}>
          <div className="form-group">
            <select className="styled-select">
              <option value="relevant">relevance</option>
              <option value="helpful">helpful</option>
              <option value="newest">newest</option>
            </select>
          </div>
        </form>
      </div>
      {searchBar()}
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
              <button
                data-bs-toggle="modal"
                data-bs-target="#reviewModal"
                type="button"
                className="btn btn-outline-dark w-30 p-3"
                onClick={() => { dispatch({ type: MODAL_CLICK }); }}
              >
                ADD A REVIEW +
              </button>
            </div>
          )
          : (
            <div>
              <button
                data-bs-toggle="modal"
                data-bs-target="#reviewModal"
                type="button"
                className="btn btn-outline-dark w-30 p-3"
                onClick={() => { dispatch({ type: MODAL_CLICK }); }}
              >
                ADD A REVIEW +
              </button>
              <h4 className="end-page text-muted">End of Page</h4>
            </div>
          )}
      </div>
      <AddReview
        productId={productId}
        getReviews={getReviews}
        characteristics={characteristics}
        sizefit={sizefit}
        widthlength={widthlength}
        selected={state.selected}
        count={state.count}
      />
    </>
  );
};

export default ReviewsList;
