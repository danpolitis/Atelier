import React from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import uniqid from 'uniqid';

const imageStyles = {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  marginTop: '10px',
  marginRight: '10px',
};

const ImagePreview = ({ images, handlePhotoDelete }) => (

  <div className="image-preview">
    {images.length > 0 ? images.map((image) => (
      <div key={uniqid()}>
        <img
          style={imageStyles}
          src={image}
          alt={image.name}
        />
        <IoMdCloseCircle
          className="photo-upload-delete"
          size="1.5em"
          style={{ backgroundColor: 'white', borderRadius: '50%' }}
          onClick={() => { handlePhotoDelete(image); }}
        />
      </div>
    )) : <div />}
  </div>

);

export default ImagePreview;
