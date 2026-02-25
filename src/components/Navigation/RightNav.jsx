import React from "react";

const RightNav = ({ onClick }) => {
  return (
    <button className="navBtn rightBtn" onClick={onClick}>
      {">"}
    </button>
  );
};

export default RightNav;
