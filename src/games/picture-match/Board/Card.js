import React from "react";
import { Segment } from "semantic-ui-react";
import layouts from "../data/layouts.json";

const Card = ({ card, customLayout, handleClick }) => {
  if (!card) {
    return <></>;
  }
  const layout = customLayout || layouts[card.layout % layouts.length];

  return (
    <Segment
      circular
      style={{ width: "300px", height: "300px", transform: `rotate(${card.rotation}deg)` }}
    >
      {card.pictures.map((picture, idx) => {
        const pictureStyle = layout[idx];
        return (
          <div
            onClick={(e) => handleClick(picture)}
            style={{
              cursor: "pointer",
              margin: "2px",
              display: "inline-block",
              width: `${100 * pictureStyle.s}px`,
              height: `${100 * pictureStyle.s}px`,
              position: "absolute",
              transform: `rotate(${pictureStyle.r}deg)`,
              backgroundImage: `url(/images/games/picture-match/pictures/${picture}.png)`,
              backgroundSize: "contain",
              left: `${pictureStyle.x}px`,
              top: `${pictureStyle.y}px`,
            }}
          />
        );
      })}
    </Segment>
  );
};

export default Card;
