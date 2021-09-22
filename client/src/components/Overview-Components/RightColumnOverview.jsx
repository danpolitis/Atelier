import React from 'react';
import StyleSelectorView from './RightColumn/StyleSelectorView.jsx';
import ProductDetailView from './RightColumn/ProductDetailView.jsx';
import AddToCartView from './RightColumn/AddtoCartView.jsx';

function RightColumnOverview({
  productStyles, productInfo, selectedStyle, setSelectedStyle, productId, fullscreenToggle,
}) {
  return (
    <div className={`col-lg-4 px-5 ${fullscreenToggle ? 'd-none' : ''}`}>
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
    </div>
  );
}

export default RightColumnOverview;
