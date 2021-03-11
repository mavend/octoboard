/* eslint react/style-prop-object: 0 */

import React from "react";
import Card from "./Card";
import { number, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  component: Card,
  title: "PictureMatch/Board/Card",
  excludeStories: /.*Data$/,
};

const pictureKnobs = (id) => {
  return {
    r: number("r", Math.floor(Math.random() * 360), { range: true, min: 0, max: 359, step: 1 }, id),
    s: number(
      "s",
      0.5 + Math.floor(Math.random() * 50) / 100,
      { range: true, min: 0.5, max: 1, step: 0.01 },
      id
    ),
    x: number("x", Math.floor(Math.random() * 240), { range: true, min: 0, max: 240, step: 1 }, id),
    y: number("y", Math.floor(Math.random() * 240), { range: true, min: 0, max: 240, step: 1 }, id),
  };
};

export const Default = () => (
  <Card
    card={{
      pictures: Array(boolean("Small card", false) ? 6 : 8)
        .fill()
        .map((item, idx) => idx),
      layout: number("Layout", 0),
    }}
    style="color"
    handleClick={action("handleClick")}
  />
);

export const LayoutDesignSmall = () => {
  const customLayout = [
    pictureKnobs("0"),
    pictureKnobs("1"),
    pictureKnobs("2"),
    pictureKnobs("3"),
    pictureKnobs("4"),
    pictureKnobs("5"),
  ];

  return (
    <div>
      <Card
        card={{
          pictures: [0, 1, 2, 3, 4, 5],
          layout: 0,
          rotation: number("Card Rotation", 0, { range: true, min: 0, max: 359, step: 1 }),
        }}
        style="color"
        customLayout={customLayout}
        handleClick={action("handleClick")}
      />
      <p>{JSON.stringify(customLayout)}</p>
    </div>
  );
};

export const LayoutDesignMedium = () => {
  const customLayout = [
    pictureKnobs("0"),
    pictureKnobs("1"),
    pictureKnobs("2"),
    pictureKnobs("3"),
    pictureKnobs("4"),
    pictureKnobs("5"),
    pictureKnobs("6"),
    pictureKnobs("7"),
  ];

  return (
    <div>
      <Card
        card={{
          pictures: [0, 1, 2, 3, 4, 5, 6, 7],
          layout: 0,
          rotation: number("Card Rotation", 0, { range: true, min: 0, max: 359, step: 1 }),
        }}
        style="color"
        customLayout={customLayout}
        handleClick={action("handleClick")}
      />
      <p>{JSON.stringify(customLayout)}</p>
    </div>
  );
};
