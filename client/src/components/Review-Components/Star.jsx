import React from 'react';
import StarRatings from 'react-star-ratings';

function Star({ average, theme }) {
  return (
    <div
      className="star-rating"
      style={{ paddingTop: '10px' }}
    >
      <StarRatings
        starSpacing="2px"
        rating={Number(average)}
        starRatedColor={theme ? 'rgb(0,0,0)' : 'rgb(255,255,255)'}
        starEmptyColor={theme ? 'rgb(203, 211, 227)' : 'rgb(105,105,105)'}
        numberOfStars={5}
        starDimension="15px"
      />
    </div>

  );
}

export default Star;
