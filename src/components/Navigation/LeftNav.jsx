import React from "react";

const LeftNav = ({ onClick }) => {
  return (
    <button className="navBtn leftBtn" onClick={onClick}>
      {"<"}
    </button>
  );
};

export default LeftNav;
