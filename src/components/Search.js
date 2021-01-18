import React from 'react';

const Search = (props) => {
  return (
    <div className="search">
      <h3>Hae aseman nimellä</h3>
      <input
        type="text"
        placeholder="Search"
        value={props.inputValue}
        onChange={props.searchHandler}
      />
    </div>
  );
};

export default Search;
