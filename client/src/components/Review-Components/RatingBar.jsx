import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import uniqid from 'uniqid';

const RatingBar = ({
  total, ratings, handleChange, starFilter,
}) => {
  const arrayHolder = [5, 4, 3, 2, 1];
  const progressBar = arrayHolder.map((star) => {
    const toNumberStar = Number(ratings[star]) || 0;
    const rating = toNumberStar ? (toNumberStar / total) * 100 : 0;
    return (
      <div style={{ paddingLeft: 0 }} key={uniqid()}>
        <p className="progress-label" style={{ float: 'left', marginRight: '1em' }}>
          <input
            className="check-box-rating"
            style={{
              position: 'relative',
              left: '28px',
              top: '5px',
              cursor: 'pointer',
              opacity: '0%',
            }}
            type="checkbox"
            checked={starFilter[star]}
            value={star.toString()}
            onChange={handleChange}
          />
          <u style={starFilter[star] ? { color: 'green' } : { color: 'black' }}>
            {star}
            {' '}
            Stars
          </u>
        </p>
        <ProgressBar style={{ width: '57%', height: '7px' }} now={rating} />
      </div>
    );
  });
  return (
    <div id="progress-bar" style={{ fontSize: 'small' }} className="row">
      {progressBar}
    </div>
  );
};

export default RatingBar;
