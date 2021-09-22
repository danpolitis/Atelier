import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ReviewListEntry from './ReviewListEntry.jsx';
import AddReview from './ReviewForm/AddReview.jsx';

const ReviewsList = (props) => {
  const [searchText, setsearchText] = useState('');
  const {
    productId, totalRatings, characteristics, sizefit, widthlength, handleSortChange,
    handleModalClick, handleMoreReviews, reviews, count,
    selected, getReviews,
  } = props;

  const searchBar = () => (
    <div
      className="review-search"
      style={{
        marginBottom: '15px',
      }}
    >
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          id="searchbar-form"
          placeholder="Search for reviews..."
          value={searchText}
          onChange={(e) => setsearchText(e.target.value)}
        />
      </InputGroup>
    </div>
  );

  return (
    <>
      <div className="review-sort">
        <p className="review-sort-font" style={{ fontWeight: 'bold', paddingRight: '10px' }}>
          {`${totalRatings} reviews, sorted by`}
        </p>
        <form onChange={handleSortChange}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
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
        {searchText.length >= 3 ? reviews.filter((review) => {
          const bodyCheck = review.body.toLowerCase().includes(searchText.toLowerCase());
          const summaryCheck = review.summary.toLowerCase().includes(searchText.toLowerCase());
          if (bodyCheck) {
            return review;
          }
          if (summaryCheck) {
            return review;
          }
        }).slice(0, count).map((review) => (
          <ReviewListEntry
            productId={productId}
            count={count}
            getReviews={getReviews}
            key={review.review_id}
            review={review}
            selected={selected}
            searchText={searchText}
          />
        )) : reviews.slice(0, count).map((review) => (
          <ReviewListEntry
            productId={productId}
            count={count}
            getReviews={getReviews}
            key={review.review_id}
            review={review}
            selected={selected}
            searchText={searchText}
          />
        ))}
        {(reviews.length >= 2 && reviews.length >= count)
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
              <h4 className="end-page text-muted" style={{ marginTop: '20px' }}>End of Page</h4>
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
