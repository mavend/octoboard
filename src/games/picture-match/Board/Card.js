import React from "react";
import { Segment } from "semantic-ui-react";
import layouts from "../data/layouts.json";

const Card = ({ card, customLayout, type, selected, handleClick }) => {
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
        const filter =
          type === selected.type
            ? picture === selected.picture
              ? "drop-shadow(0 0 3px rgb(0, 150, 253))"
              : "saturate(20%) opacity(40%)"
            : "";
        const pictureStyle = layout[idx];
        return (
          <div
            key={`${type}-${picture}`}
            onClick={(e) => handleClick(type, picture)}
            style={{
              filter: filter,
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
