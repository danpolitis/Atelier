import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import _ from 'underscore';
import { ProductContext } from '../../ProductContext.jsx';
import Img from 'react-cool-img';

const StyleThumbnailsDiv = styled.div`
  img.selectedImg {
    width: 60px;
    border-radius: 50%;
    height: 60px;
    object-fit: cover;
  }
  img.checkIcon {
    position: absolute;
    background: white;
    border-radius: 50%;
    left: 50px;
  }
  button {
    position: relative;
    background: none;
    border: none;
    display: flex;
    flex-basis: 25%;
  }
`;

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
      <div className="mb-2 text-uppercase">
        <span className="fw-bold">STYLE &gt; </span>
        <span className="">{selectedStyle.name}</span>
      </div>
      <StyleThumbnailsDiv id="style-thumbnails" className="d-flex flex-wrap col-lg-8">
        {renderStyleThumbnails}
      </StyleThumbnailsDiv>
    </>
  );
}

// Render thumbnail helper function
function StyleThumbnails(props) {
  const {
    photoUrl, altText, styleId, setSelectedStyleId, selectedStyleId,
  } = props;

  const displayUrl = photoUrl === null ? 'No-Image-Placeholder.svg' : photoUrl;
  const { setRecordInteraction } = useContext(ProductContext);

  function handleStyleChange(e) {
    setSelectedStyleId(styleId);
    setRecordInteraction({
      element: `${e.target}`,
      widget: 'Overview',
      time: new Date(),
    });
  }

  return (
    <button type="button" onClick={handleStyleChange} className="mb-4">
      <Img className="selectedImg" src={displayUrl} alt={altText} />
      {styleId === selectedStyleId ? <img className="checkIcon" src="assets/faCheckCircle.svg" alt="faCheckCircle.svg" /> : ''}
    </button>
  );
}

export default StyleSelectorView;
