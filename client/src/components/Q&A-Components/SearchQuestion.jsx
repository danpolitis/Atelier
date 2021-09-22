import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 500px;
  height: 28px;
  margin: 1rem .125rem;
`;

const SearchQuestion = ({ handleSearch }) => (

  <div>
    <form>
      <div>
        <Input
          className="form-control"
          type="text"
          placeholder="Have a Question? Search for Answers ..."
          onChange={(e) => { handleSearch(e); }}
        />
      </div>
    </form>
  </div>
);

export default SearchQuestion;
