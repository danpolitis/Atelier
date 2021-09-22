import React from 'react';
import styled from 'styled-components';

const StyledNavbar = styled.nav`
  height: 80px;
  .faSearch {
    height: 1em;
    width: 1em;
    filter: invert(1);
  }
`;

function Navbar() {
  return (
    <StyledNavbar className="navbar navbar-expand-lg navbar-light bg-secondary px-5 py-3">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/"><img src="./catpaw.png" alt="logo" width={50} height={50} /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex ms-auto">
            <input className="form-control me-2 bg-transparent border-bottom border-top-0 border-start-0 border-end-0 border-2 rounded-0 text-white" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-dark bg-transparent border-0 fs-3" type="submit">
              <img src="assets/faSearch.svg" alt="faSearch" className="faSearch" />
            </button>
          </form>
        </div>
      </div>
    </StyledNavbar>
  );
}

export default Navbar;
