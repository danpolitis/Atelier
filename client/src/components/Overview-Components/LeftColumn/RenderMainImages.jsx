import React from 'react';
import styled from 'styled-components';
import Img from 'react-cool-img';

const CarouselItem = styled.div`
  cursor: zoom-in;
  &.zoomed {
    cursor: zoom-out;
    height: 100vh;
  }
  img {
    position: relative;
    object-fit: contain;
    object-position: center;
    overflow: hidden;
    height: 75vh;
    z-index: 10;
    &.fullscreen {
      cursor: crosshair;
      height: calc(100vh - 160px) !important;
    }
  }
`;

function RenderMainImages(props) {
  const {
    photoUrl, altText, idx, setFullscreenToggle, fullscreenToggle, setZoom, zoom,
  } = props;

  function handleFullscreen() {
    setFullscreenToggle(!fullscreenToggle);
  }

  function handleZoom(e) {
    setZoom(!zoom);
    if (fullscreenToggle) {
      e.target.style.transform = '';
    }
  }

  function getMouseLocation(e) {
    const posX = e.clientX;
    const posY = e.clientY - 160;
    const winX = e.target.offsetWidth;
    const winY = e.target.offsetHeight;
    const picX = e.target.naturalWidth * 5;
    let picY = e.target.naturalHeight * 4;
    if (e.target.naturalHeight > e.target.naturalWidth) {
      picY = e.target.naturalHeight * 7;
    }
    const renderY = ((posY / winY) - 0.5) * (picY / 2);
    const renderX = ((posX / winX) - 0.5) * (picX / 2);
    e.target.style.transform = `translate(${renderX}px, ${renderY}px) scale(2.5)`;
  }

  return (
    <CarouselItem className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
      <Img
        onClick={fullscreenToggle ? handleZoom : handleFullscreen}
        src={photoUrl}
        className={`
          d-block w-100
          ${zoom ? 'zoomed' : ''}
          ${fullscreenToggle ? 'fullscreen' : ''}
        `}
        alt={altText}
        onMouseMove={zoom ? getMouseLocation : () => {}}
        aria-hidden="true"
      />
    </CarouselItem>
  );
}

export default RenderMainImages;
