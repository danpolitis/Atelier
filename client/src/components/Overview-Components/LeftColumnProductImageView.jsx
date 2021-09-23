import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { ProductContext } from '../ProductContext.jsx';

import RenderMainImages from './LeftColumn/RenderMainImages.jsx';
import MainThumbnails from './LeftColumn/MainThumbnails.jsx';
import MainIndicators from './LeftColumn/MainIndicators.jsx';

// STYLED COMPONENTS
const MainImageInner = styled.div`
  height: 75vh;
  width: 100%;
  ${(props) => props.showFullscreen && css`
    height: calc(100vh - 160px) !important;
  `}
`;
const CarouselIndicators = styled.div`
  &.normalView {
    position: absolute;
    width: 10%;
    margin: 0;
    padding-left: 10px;
    top: 0;
    .active {
      padding-bottom: 5px;
    }
  }
  [data-bs-target] {
    box-sizing: border-box !important;
    border: 0;
  }
  .thumbnailArrows {
    color: black;
    width: 60px;
    position: relative;
  }
`;
const FullscreenButton = styled.button`
  display: flex;
  position: absolute;
  background: none;
  border: hidden;
  top: 10px;
  right: 10px;
  z-index: 2;
`;
const PrevIcon = styled.span`
  filter: invert();
`;
const NextIcon = styled.span`
  filter: invert();
`;
const CarouselPrevButton = styled.button`
  left: 40px;
`;

function LeftColumnProductImageView({ selectedStyle, fullscreenToggle, setFullscreenToggle }) {
  let renderMainImages;
  const thumbnailsLength = selectedStyle.photos ? selectedStyle.photos.length : 0;

  // STATE COMPONENTS
  const [zoom, setZoom] = useState(false);
  const [thumbRange, setThumbRange] = useState([0, 6]);
  const { theme } = useContext(ProductContext);

  // CLICK EVENT HANDLERS
  function handleFullscreen() {
    setFullscreenToggle(!fullscreenToggle);
  }

  function thumbClickUp() {
    setThumbRange([
      thumbRange[0] === 0 ? 0 : thumbRange[0] - 1,
      thumbRange[1] === thumbnailsLength - 7 ? thumbnailsLength - 7 : thumbRange[1] - 1,
    ]);
  }

  function thumbClickDown() {
    setThumbRange([
      thumbRange[0] === thumbnailsLength - 7 ? thumbnailsLength - 7 : thumbRange[0] + 1,
      thumbRange[1] === thumbnailsLength - 1 ? thumbnailsLength - 1 : thumbRange[1] + 1,
    ]);
  }

  // CONDITIONAL RENDERING
  if (selectedStyle.photos) {
    renderMainImages = selectedStyle.photos.map((photo, idx) => {
      const displayUrl = photo.url === null ? 'No-Image-Placeholder.svg' : photo.url;
      return (
        <RenderMainImages
          key={idx}
          idx={idx}
          photoUrl={displayUrl}
          altText={selectedStyle.name}
          setFullscreenToggle={setFullscreenToggle}
          fullscreenToggle={fullscreenToggle}
          zoom={zoom}
          setZoom={setZoom}
        />
      );
    });
  } else {
    renderMainImages = '';
  }

  let renderMainThumbnails;
  if (selectedStyle.photos) {
    renderMainThumbnails = selectedStyle.photos.map((photo, idx) => (
      <MainThumbnails
        key={idx}
        idx={idx}
        photoUrl={photo.thumbnail_url}
        altText={selectedStyle.name}
        display={thumbRange[0] <= idx && idx <= thumbRange[1]}
      />
    ));
  } else {
    renderMainThumbnails = '';
  }

  let renderMainIndicators;
  if (selectedStyle.photos) {
    renderMainIndicators = selectedStyle.photos.map((photo, idx) => (
      <MainIndicators
        key={idx}
        idx={idx}
      />
    ));
  } else {
    renderMainIndicators = '';
  }

  return (
    <div className={`${fullscreenToggle ? 'col-lg-12 h-100 g-0' : 'col-lg-8'}`}>
      <div id="mainImage" className={`carousel slide carousel-fade ${theme ? 'bg-light' : 'bg-dark'}`} data-interval="false">
        <MainImageInner id="mainImageInner" className="carousel-inner" showFullscreen={fullscreenToggle}>
          {renderMainImages}
        </MainImageInner>
        <FullscreenButton type="button" className={`fullscreen-icon ${zoom ? 'd-none' : ''}`} onClick={handleFullscreen}>
          <img alt="biFullscreen" id="biFullscreen" src="assets/biFullscreen.svg" />
        </FullscreenButton>
        <div className={`${zoom ? 'd-none' : ''}`}>
          <CarouselIndicators className={`carousel-indicators ${fullscreenToggle ? 'fullscreenView' : 'normalView d-flex flex-column justify-content-evenly'}`}>
            <img
              src="assets/BsChevronCompactUp.svg"
              alt="BsChevronCompactUp"
              className={`thumbnailArrows ${thumbnailsLength > 7 && thumbRange[0] !== 0 ? '' : 'd-none'} ${fullscreenToggle ? 'd-none' : ''}`}
              onClick={thumbClickUp}
              onKeyUp={thumbClickUp}
              aria-hidden="true"
            />
            {fullscreenToggle ? renderMainIndicators : renderMainThumbnails}
            <img
              src="assets/BsChevronCompactDown.svg"
              alt="BsChevronCompactDown"
              className={`thumbnailArrows ${thumbnailsLength > 7 && thumbRange[1] !== thumbnailsLength - 1 ? '' : 'd-none'} ${fullscreenToggle ? 'd-none' : ''}`}
              onClick={thumbClickDown}
              onKeyDown={thumbClickDown}
              aria-hidden="true"
            />
          </CarouselIndicators>
          <CarouselPrevButton className="carousel-control-prev" type="button" data-bs-target="#mainImage" data-bs-slide="prev">
            <PrevIcon className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </CarouselPrevButton>
          <button className="carousel-control-next" type="button" data-bs-target="#mainImage" data-bs-slide="next">
            <NextIcon className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeftColumnProductImageView;
