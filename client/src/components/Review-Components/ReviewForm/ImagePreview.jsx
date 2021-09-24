import React, { useContext } from 'react';
import uniqid from 'uniqid';
import { ProductContext } from '../../ProductContext.jsx';

const imageStyles = {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  marginTop: '10px',
  marginRight: '10px',
};

const ImagePreview = ({ images, handlePhotoDelete }) => {
  const { setRecordInteraction } = useContext(ProductContext);

  return (
    <div className="image-preview" style={{ display: 'flex' }}>
      {images.length > 0 ? images.map((image) => (
        <div key={uniqid()}>
          <img
            style={imageStyles}
            src={image}
            alt={image.name}
          />
          <img
            src="x-circle-fill.svg"
            alt="x-button"
            className="photo-upload-delete"
            size="1.5em"
            style={{
              backgroundColor: 'white',
              borderRadius: '50%',
              position: 'relative',
              top: '-35px',
              left: '-26px',
            }}
            onClick={(e) => {
              handlePhotoDelete(image); setRecordInteraction({
                element: `${e.target}`,
                widget: 'Review and Rating',
                time: new Date(),
              });
            }}
          />
        </div>
      )) : <div />}
    </div>
  );
};

export default ImagePreview;
