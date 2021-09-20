import React, { useContext } from 'react';
import StarRatings from 'react-star-ratings';
import { ProductContext } from '../../ProductContext.jsx';

function ProductDetailView({ productInfo, selectedStyle }) {
  let renderPrice;
  const { averageRating } = useContext(ProductContext);
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
      <div className="reviewSnippet my-3 d-flex">
        <span>
          <div className="star-rating">
            <StarRatings starSpacing="2px" rating={Number(averageRating) || 0} starRatedColor="rgb(0,0,0)" numberOfStars={5} starDimension="1em" />
          </div>
        </span>
        <span className="ratingLink"><a href="#reviews" className="text-dark">Read all reviews</a></span>
      </div>
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
