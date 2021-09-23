import React, { useContext } from 'react';
import StarRatings from 'react-star-ratings';
import styled from 'styled-components';
import { ProductContext } from '../../ProductContext.jsx';

const ReviewSnippet = styled.div`
  svg {
    height: 20px !important;
    width: 20px !important;
  }
  .star-rating {
    padding-top: 0px !important;
  }
  .ratingLink {
    margin-top: 4px;
    margin-left: 10px;
  }
`;

function ProductDetailView({ productInfo, selectedStyle }) {
  let renderPrice;
  const { averageRating, theme } = useContext(ProductContext);
  if (selectedStyle.sale_price) {
    renderPrice = (
      <div>
        <span className="text-danger me-3">{selectedStyle.sale_price}</span>
        <del>{selectedStyle.original_price}</del>
      </div>
    );
  } else {
    renderPrice = `$${selectedStyle.original_price}`;
  }

  return (
    <>
      {/* Review snippent */}
      <ReviewSnippet className="reviewSnippet my-3 d-flex">
        <span>
          <div className="star-rating">
            <StarRatings
              starSpacing="2px"
              rating={Number(averageRating) || 0}
              starRatedColor={theme ? 'rgb(0,0,0)' : 'rgb(255,255,255)'}
              starEmptyColor={theme ? 'rgb(203, 211, 227)' : 'rgb(100,100,100)'}
              numberOfStars={5}
              starDimension="1em"
            />
          </div>
        </span>
        <span className="ratingLink"><a href="#reviews">Read all reviews</a></span>
      </ReviewSnippet>
      {/*  Category */}
      <div className="text-uppercase">
        {productInfo.category}
      </div>
      {/* Product Name */}
      <div className="fs-1 fw-bold mb-3">
        {productInfo.name}
      </div>
      {/* Product Price */}
      <div className="mb-3">
        {renderPrice}
      </div>
    </>
  );
}
export default ProductDetailView;
