import React from 'react';
import styled, { css } from 'styled-components';

const MainThumbnailsImg = styled.img`
  &.active {
    border-bottom: 5px solid black;
    padding-bottom: 5px;
  }
  width: 60px !important;
  height: 60px !important;
  object-fit: cover;
  opacity: 1 !important;
`;

function MainThumbnails({ photoUrl, altText, idx, display }) {
  const displayUrl = photoUrl === null ? 'No-Image-Placeholder.svg' : photoUrl;
  return (
    <MainThumbnailsImg
      src={displayUrl}
      data-imgthumb={idx}
      className={`d-block w-100 my-3 ${idx === 0 ? 'active' : ''} ${display ? '' : 'd-none'}`}
      alt={altText}
      data-bs-target="#mainImage"
      data-bs-slide-to={idx}
      aria-label={`Slide ${idx + 1}`}
      aria-current={`${idx === 0 ? 'true' : ''}`}
    />
  );
}

export default MainThumbnails;
