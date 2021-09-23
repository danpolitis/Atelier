import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body, .modal-content, .close, .card, .right-arrow, .left-arrow {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }

  button, .form-select {
    border-color: ${({ theme }) => theme.border} !important;
    color: ${({ theme }) => theme.text} !important;
  }
  a, u {
    color: ${({ theme }) => theme.text} !important;
  }
  .form-select {
    background: none;
  }
  #bsStar, #mainImage img.thumbnailArrows, #mainImage img#biFullscreen {
    filter: ${({ theme }) => theme.filter} !important;
  }
  nav {
    background: ${({ theme }) => theme.navBackground};
  }
  #mainImage .carousel-control-next-icon, #mainImage .carousel-control-prev-icon {
    filter: ${({ theme }) => theme.mainArrow} !important;
  }
  .normalView .active {
    border-bottom: ${({ theme }) => theme.thumbnailBorder} !important;
  }
  #style-thumbnails img.selectedImg {
    border: ${({ theme }) => theme.selectedBorder}
  }
`;

export default GlobalStyles;
