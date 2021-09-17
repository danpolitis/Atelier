import React from 'react';

const ImagePreview = ({ images }) => (

  <div className="card" style={{ width: '18rem' }}>
    <img className="card-img-top" src="https://images.pexels.com/photos/8217300/pexels-photo-8217300.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="Card image cap" />
    <div className="card-body">
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
  </div>

);

export default ImagePreview;
