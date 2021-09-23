import React from 'react';
import styled, { css } from 'styled-components';
import Img from 'react-cool-img';

const MainThumbnailsWrapper = styled.div`
  .active {
    border-bottom: 5px solid black;
    padding-bottom: 5px;
  }
  .mainThumbnail {
    width: 60px !important;
    height: 60px !important;
    object-fit: cover;
    opacity: 1 !important;
  }
`;

function MainThumbnails({ photoUrl, altText, idx, display }) {
  const displayUrl = photoUrl === null ? 'No-Image-Placeholder.svg' : photoUrl;
  return (
    <MainThumbnailsWrapper>
      <Img
        src={displayUrl}
        data-imgthumb={idx}
        className={`mainThumbnail d-block w-100 my-3 ${idx === 0 ? 'active' : ''} ${display ? '' : 'd-none'}`}
        alt={altText}
        data-bs-target="#mainImage"
        data-bs-slide-to={idx}
        aria-label={`Slide ${idx + 1}`}
        aria-current={`${idx === 0 ? 'true' : ''}`}
      />
    </MainThumbnailsWrapper>
  );
}

export default MainThumbnails;
