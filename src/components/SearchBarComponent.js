import React from "react";

const SearchBar = ({ input: keyword, onChange: setKeyword }) => {
  const BarStyling = {
    width: "20rem",
    background: "#F2F1F9",
    border: "2px",
    padding: "0.5rem",
  };
  return (
    <input
      style={BarStyling}
      key="random1"
      value={keyword}
      placeholder={"Buscar cancion"}
      onChange={(event) => setKeyword(event.target.value)}
    />
  );
};

export default SearchBar;
