import React, { useEffect, useState, useContext } from 'react';
import { ProductContext } from './ProductContext.jsx';

import LeftColumnProductImageView from './Overview-Components/LeftColumnProductImageView.jsx';
import RightColumnOverview from './Overview-Components/RightColumnOverview.jsx';
import ProductFeatureView from './Overview-Components/ProductFeatureView.jsx';

function Overview({ productId }) {
  const { productInfo, productStyles } = useContext(ProductContext);

  const [selectedStyle, setSelectedStyle] = useState({});
  const [fullscreenToggle, setFullscreenToggle] = useState(false);

  useEffect(() => {
    const styleList = productStyles.results;
    let noDefaultFlag = true;
    if (styleList) {
      styleList.forEach((style) => {
        if (style['default?']) {
          setSelectedStyle(style);
          noDefaultFlag = false;
        }
      });
      if (noDefaultFlag) {
        setSelectedStyle(styleList[0]);
      }
    }
  }, [productStyles]);

  return (
    <>
      <div className="container-fluid mb-5 px-0">
        <div className="row me-0">
          <LeftColumnProductImageView
            selectedStyle={selectedStyle}
            fullscreenToggle={fullscreenToggle}
            setFullscreenToggle={setFullscreenToggle}
          />
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
        <ProductFeatureView productInfo={productInfo} selectedStyle={selectedStyle} />
      </div>
    </>
  );
}

export default Overview;
