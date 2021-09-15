import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

const ReviewListEntry = (props) => {
  const [formatDate, setDate] = useState('January 1, 2019');

  const dateFormat = (date) => new Promise((resolve) => {
    resolve(date);
  })
    .then((result) => {
      const date = new Date(result.substring(0, 10));
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      setDate(date.toLocaleDateString('en-US', options));
    });

  const helpfulRequest = () => {
    axios.put(`/api/reviews/${props.review.review_id}/helpful`)
      .then(() => {
        console.log('Helpful Updated');
        props.getReviews(props.productId, props.count);
      });
  };

  const reportRequest = () => {
    axios.put(`/api/reviews/${props.review.review_id}/report`)
      .then(() => {
        console.log('Review reported');
        props.getReviews(props.productId, props.count);
      });
  };

  useEffect(() => {
    dateFormat(props.review.date);
  }, []);

  return (
    <div className="review-container">
      <div className="d-flex justify-content-between">
        <StarRatings starSpacing="2px" rating={props.review.rating} starRatedColor="rgb(0,0,0)" numberOfStars={5} starDimension="15px" />
        <p className="username"><small>{`${props.review.reviewer_name}, ${formatDate}`}</small></p>
      </div>
      <div>
        {props.review.summary.length > 60
          ? (
            <div>
              <p><strong>{`${props.review.summary.substring(0, 60)}...`}</strong></p>
              <p><small>{props.review.summary.substring(60)}</small></p>
            </div>
          ) : <p><strong>{props.review.summary}</strong></p>}
      </div>
      <div>
        <p><small>{props.review.body}</small></p>
      </div>
      <div>
        {props.review.recommend
          ? (
            <div>
              <p>
                <i className="bi bi-check2" />
                <small className="recommend"> I recommend this product</small>
              </p>
            </div>
          ) : <div /> }
      </div>
      <div>
        {(props.review.response !== '' && props.review.response !== null)
          ? (
            <div>
              <p>Resonse: </p>
              <p>{props.review.response}</p>
            </div>
          ) : <div /> }
      </div>
      <div>
        <p className="helpful-review">
          <small>
            Helpful?
            {' '}
            <u onClick={helpfulRequest} className="helpful-review-yes">Yes</u>
            {' '}
            (
            {props.review.helpfulness}
            ) |
            {' '}
            <u onClick={reportRequest} className="helpful-review-yes">Report</u>
          </small>
        </p>
      </div>
    </div>
  );
};

export default ReviewListEntry;
