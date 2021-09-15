import React from 'react';

function ProductFeatureView({ productInfo }) {
  let renderFeatures;
  if (productInfo.features) {
    renderFeatures = productInfo.features.map((feature, idx) => (
      <FeaturesList key={idx} feature={feature} />
    ));
  } else {
    renderFeatures = '';
  }

  return (
    <div className="row">
      <div className="col-lg-8 border-end border-3 border-secondary">
        <div className="fs-2 fw-bold">
          {productInfo.slogan}
        </div>
        <div className="">
          {productInfo.description}
        </div>
      </div>
      <div id="featureList" className="col-lg-4">
        <ul>
          {renderFeatures}
        </ul>
      </div>
    </div>
  );
}

function FeaturesList({ feature }) {
  return (
    <li className="d-flex align-items-center position-relative">
      {feature.feature} {feature.value}
    </li>
  );
}

export default ProductFeatureView;
