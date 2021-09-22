import React from 'react';
import StarRatings from 'react-star-ratings';

function Star({ average }) {
  return (
    <div
      className="star-rating"
      style={{ paddingTop: '10px' }}
    >
      <StarRatings starSpacing="2px" rating={Number(average)} starRatedColor="rgb(0,0,0)" numberOfStars={5} starDimension="15px" />
    </div>

  );
}

export default Star;
