import React from 'react';
import StarRatings from 'react-star-ratings';

function Star({ average, theme }) {
  return (
    <div
      className="star-rating"
      style={{ paddingTop: '10px' }}
    >
      <StarRatings starSpacing="2px" rating={Number(average)} starRatedColor={theme ? 'rgb(0,0,0)' : 'rgb(255,255,255)'} numberOfStars={5} starDimension="15px" />
    </div>

  );
}

export default Star;
