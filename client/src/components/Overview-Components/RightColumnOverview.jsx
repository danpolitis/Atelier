/* eslint-disable react/prop-types */
import React from 'react';
import StyleSelectorView from './StyleSelectorView.jsx';
import ProductDetailView from './ProductDetailView.jsx';
import AddToCartView from './AddtoCartView.jsx';

function RightColumnOverview({
  productStyles, productInfo, selectedStyle, setSelectedStyle, productId, fullscreenToggle,
}) {
  return (
    <div className={`col-lg-4 ${fullscreenToggle ? 'd-none' : ''}`}>
      <ProductDetailView
        productInfo={productInfo}
        selectedStyle={selectedStyle}
        productId={productId}
      />
      <StyleSelectorView
        productStyles={productStyles}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
      />
      <AddToCartView selectedStyle={selectedStyle} />
      {/* TODO: not on mockup, but in business doc: product overview and share on social media */}
    </div>
  );
}

export default RightColumnOverview;
