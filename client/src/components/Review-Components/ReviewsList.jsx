import React, { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ReviewListEntry from './ReviewListEntry.jsx';
import AddReview from './ReviewForm/AddReview.jsx';

const ReviewsList = (props) => {
  const [searchText, setsearchText] = useState('');
  const {
    productId, totalRatings, characteristics, sizefit, widthlength, handleSortChange,
    handleModalClick, handleMoreReviews, reviews, count, selected, getReviews,
  } = props;

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

  return (
    <>
      <div className="review-sort">
        <p className="review-sort-font">
          {`${totalRatings} reviews, sorted by`}
        </p>
        <form onChange={handleSortChange}>
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
        {reviews.map((review) => (
          <ReviewListEntry
            productId={productId}
            count={count}
            getReviews={getReviews}
            key={review.review_id}
            review={review}
            selected={selected}
          />
        ))}
        {(totalRatings >= 2 && totalRatings >= count)
          ? (
            <div className="btn-toolbar pull-right">
              <button onClick={handleMoreReviews} type="button" className="btn btn-outline-dark w-30 p-3">MORE REVIEWS</button>
              <button
                data-bs-toggle="modal"
                data-bs-target="#reviewModal"
                type="button"
                className="btn btn-outline-dark w-30 p-3"
                onClick={handleModalClick}
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
                onClick={handleModalClick}
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
        selected={selected}
        count={count}
      />
    </>
  );
};

export default ReviewsList;
