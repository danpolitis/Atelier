import React from 'react';

const SearchQuestion = ({ handleSearch }) => (

  <div>
    <form>
      <input
        className="search-bar form-control"
        type="text"
        placeholder="Have a Question? Search for Answers ..."
        onChange={(e) => { handleSearch(e); }}
      />
    </form>
  </div>
);

export default SearchQuestion;
