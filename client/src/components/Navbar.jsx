/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { FaSearch } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary px-5 py-3">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">Logo</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex ms-auto">
            <input className="form-control me-2 bg-transparent border-bottom border-top-0 border-start-0 border-end-0 border-2 rounded-0 text-white" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-dark bg-transparent border-0 fs-3" type="submit"><FaSearch /></button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
