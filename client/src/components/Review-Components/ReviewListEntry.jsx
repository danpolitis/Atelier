import React, { useState, useEffect, useContext } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import { ProductContext } from '../ProductContext.jsx';

const ReviewListEntry = (props) => {
  const [formatDate, setDate] = useState('January 1, 2019');
  const {
    productId, getReviews, review, selected, searchText, theme,
  } = props;
  const { setRecordInteraction } = useContext(ProductContext);

  const dateFormat = (date) => new Promise((resolve) => {
    resolve(date);
  })
    .then((result) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const splitDate = result.substring(0, 10);
      const newDate = new Date(splitDate);
      const correctDateFormat = newDate.toLocaleDateString('en-US', options);
      setDate(correctDateFormat);
    });

  const helpfulRequest = (e) => {
    axios.put(`/api/reviews/${review.review_id}/helpful`)
      .then(() => {
        getReviews(productId, selected);
      });
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'Review and Rating',
      time: new Date(),
    });
  };

  const reportRequest = (e) => {
    axios.put(`/api/reviews/${review.review_id}/report`)
      .then(() => {
        getReviews(productId, selected);
      });
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'Review and Rating',
      time: new Date(),
    });
  };

  const getHighlightedText = (text, highlight) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {' '}
        { parts.map((part, i) => (
          <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { backgroundColor: '#ADAD85', fontWeight: 'bold' } : {}}>
            { part }
          </span>
        ))}
        {' '}

      </span>
    );
  };

  useEffect(() => {
    dateFormat(review.date);
  }, []);

  return (
    <div className="review-container" style={theme ? { borderBottom: '1px solid black' } : { borderBottom: '1px solid white' }}>
      <div className="d-flex justify-content-between">
        <StarRatings
          starSpacing="2px"
          rating={review.rating}
          starRatedColor={theme ? 'rgb(0,0,0)' : 'rgb(255,255,255)'}
          starEmptyColor={theme ? 'rgb(203, 211, 227)' : 'rgb(105,105,105)'}
          numberOfStars={5}
          starDimension="15px"
        />
        <p className="username" style={{ fontSize: '.7em' }}><small>{`${review.reviewer_name}, ${formatDate}`}</small></p>
      </div>
      <div>
        {review.summary.length > 60
          ? (
            <div>
              <p><strong>{`${review.summary.substring(0, 60)}...`}</strong></p>
              <p><small>{review.summary.substring(60)}</small></p>
            </div>
          ) : <p><strong>{getHighlightedText(review.summary, searchText)}</strong></p>}
      </div>
      <div>
        <p><small>{getHighlightedText(review.body, searchText)}</small></p>
      </div>
      <div>
        {review.recommend
          ? (
            <div>
              <p>
                {theme ? <img src="check2.svg" alt="check" /> : <img src="check2-white.svg" alt="check" /> }
                <small className="recommend"> I recommend this product</small>
              </p>
            </div>
          ) : <div /> }
      </div>
      <div>
        {(review.response)
          ? (
            <div>
              <p>Resonse: </p>
              <p>{review.response}</p>
            </div>
          ) : <div /> }
      </div>
      <div>
        <p className="helpful-review" style={{ fontSize: '.7em' }}>
          <small>
            Helpful?
            {' '}
            <u onClick={helpfulRequest} className="helpful-review-yes" style={{ cursor: 'pointer' }}>Yes</u>
            {' '}
            (
            {review.helpfulness}
            ) |
            {' '}
            <u onClick={reportRequest} className="helpful-review-yes" style={{ cursor: 'pointer' }}>Report</u>
          </small>
        </p>
      </div>
    </div>
  );
};

export default ReviewListEntry;
