import React from 'react';

function Announcement() {
  return (
    <div
      id="announcement"
      style={{ height: '80px' }}
      className="d-flex align-items-center justify-content-center"
    >
      <p className="text-center">
        SITE WIDE ANNOUNCEMENT MESSAGE! SALE / DISCOUNT
        {' '}
        <b>OFFER</b>
        {' '}
        -
        {' '}
        <u>NEW PRODUCT HIGHLIGHT</u>
      </p>
    </div>
  );
}

export default Announcement;
