import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body, .modal-content, .close {
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
  #bsStar {
    filter: ${({ theme }) => theme.filter} !important;
  }
  nav {
    background: ${({ theme }) => theme.navBackground};
  }
`;

export default GlobalStyles;
