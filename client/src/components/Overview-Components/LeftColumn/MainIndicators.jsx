import React from 'react';

function MainIndicators({ idx }) {
  return (
    <button
      type="button"
      data-bs-target="#mainImage"
      data-bs-slide-to={idx}
      className={`my-3 ${idx === 0 ? 'active' : 'inactive'}`}
      aria-label="image-indicator"
      aria-current={`${idx === 0 ? 'true' : ''}`}
    />
  );
}

export default MainIndicators;
