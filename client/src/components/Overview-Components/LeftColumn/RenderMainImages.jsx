import React from 'react';

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
    const posY = e.clientY - 80;
    const winX = e.target.offsetWidth;
    const winY = e.target.offsetHeight;
    const picX = e.target.naturalWidth * 2.5;
    const picY = e.target.naturalHeight * 2.5;

    const renderY = ((posY / winY) - 0.5) * (picY / 2);
    const renderX = ((posX / winX) - 0.5) * (picX / 2);
    e.target.style.transform = `translate(${renderX}px, ${renderY}px) scale(2.5)`;
  }

  return (
    <div className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
      <img
        onClick={fullscreenToggle ? handleZoom : handleFullscreen}
        src={photoUrl}
        className={`d-block w-100 ${zoom ? 'zoomed' : ''}`}
        alt={altText}
        onMouseMove={zoom ? getMouseLocation : () => {}}
        aria-hidden="true"
      />
    </div>
  );
}

export default RenderMainImages;
