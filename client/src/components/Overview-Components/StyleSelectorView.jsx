/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import _ from 'underscore';
import { FaCheckCircle } from 'react-icons/fa';

function StyleSelectorView({ productStyles, selectedStyle, setSelectedStyle }) {
  let renderStyleThumbnails;

  // STATE DECLARTION
  const [selectedStyleId, setSelectedStyleId] = useState('');

  // LIFECYCLE METHODS
  useEffect(() => {
    setSelectedStyleId(selectedStyle.style_id);
  }, [selectedStyle]);

  useEffect(() => {
    _.each(productStyles.results, (style) => {
      if (style.style_id === selectedStyleId) {
        setSelectedStyle(style);
      }
    });
  }, [selectedStyleId]);

  // CONDITIONAL RENDERING
  if (selectedStyleId) {
    renderStyleThumbnails = _.map(productStyles.results, (style) => {
      const displayUrl = style.photos[0].thumbnail_url === null ? 'No-Image-Placeholder.svg' : style.photos[0].thumbnail_url;
      return (
        <StyleThumbnails
          key={style.style_id}
          styleId={style.style_id}
          photoUrl={displayUrl}
          altText={style.name}
          setSelectedStyleId={setSelectedStyleId}
          selectedStyleId={selectedStyleId}
        />
      );
    });
  } else {
    renderStyleThumbnails = '';
  }

  return (
    <>
      {/* Selected Style */}
      <div className="mb-2 text-uppercase">
        <span className="fw-bold">STYLE &gt; </span>
        <span className="">{selectedStyle.name}</span>
      </div>
      {/* Style Thumbnails */}
      <div id="style-thumbnails" className="d-flex flex-wrap col-lg-8">
        {renderStyleThumbnails}
      </div>
    </>
  );
}

// Render thumbnail helper function
function StyleThumbnails(props) {
  const {
    photoUrl, altText, styleId, setSelectedStyleId, selectedStyleId,
  } = props;

  const displayUrl = photoUrl === null ? 'No-Image-Placeholder.svg' : photoUrl;

  function handleStyleChange() {
    setSelectedStyleId(styleId);
  }

  return (
    <button type="button" onClick={handleStyleChange} className="mb-4">
      <img src={displayUrl} alt={altText} />
      {styleId === selectedStyleId ? <FaCheckCircle color="green" size="15px" /> : ''}
    </button>
  );
}

export default StyleSelectorView;
