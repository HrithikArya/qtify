import React from "react";
import { Chip } from "@mui/material";
import "./Card.css";

const Card = ({ image, title, follows, likes, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="cardImageWrapper">
        <img src={image} alt={title} />

        <Chip
          label={
            follows
              ? `${follows} Follows`
              : `${likes} Likes`
          }
          size="small"
          className="followsChip"
        />
      </div>

      <div className="cardInfo">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Card;
