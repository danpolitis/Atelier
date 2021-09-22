import React from 'react';

function Announcement() {
  return (
    <div
      id="announcement"
      style={{
        margin: '35px',
      }}
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
