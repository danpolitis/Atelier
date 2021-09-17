import React, { useEffect, useState } from 'react';
import axios from 'axios';

import LeftColumnProductImageView from './Overview-Components/LeftColumnProductImageView.jsx';
import RightColumnOverview from './Overview-Components/RightColumnOverview.jsx';
import ProductFeatureView from './Overview-Components/ProductFeatureView.jsx';

function Overview({ productId }) {
  const [productInfo, setProductInfo] = useState({});
  const [productStyles, setProductStyles] = useState({});
  const [selectedStyle, setSelectedStyle] = useState({});
  const [fullscreenToggle, setFullscreenToggle] = useState(false);

  useEffect(() => {
    axios.get(`/api/products/${productId}`)
      .then((results) => {
        setProductInfo(results.data);
      });
    axios.get(`/api/products/${productId}/styles`)
      .then((results) => {
        setProductStyles(results.data);
      });
  }, [productId]);

  useEffect(() => {
    const styleList = productStyles.results;
    if (styleList) {
      styleList.forEach((style) => {
        if (style['default?']) {
          setSelectedStyle(style);
        }
      });
    }
  }, [productStyles]);

  return (
    <>
      <div className="container-fluid mb-5 px-0">
        <div className="row me-0">
          {/* LEFT COLUMN Product image carousel */}
          <LeftColumnProductImageView
            selectedStyle={selectedStyle}
            fullscreenToggle={fullscreenToggle}
            setFullscreenToggle={setFullscreenToggle}
          />
          {/* RIGHT COLUMN Product Information side */}
          <RightColumnOverview
            productStyles={productStyles}
            productInfo={productInfo}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            productId={productId}
            fullscreenToggle={fullscreenToggle}
          />
        </div>
      </div>
      <div className="container mb-5">
        {/* BOTTOM ROW Product info row */}
        <ProductFeatureView productInfo={productInfo} selectedStyle={selectedStyle} />
      </div>
    </>
  );
}

export default Overview;
