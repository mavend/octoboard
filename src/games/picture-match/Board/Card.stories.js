/* eslint react/style-prop-object: 0 */

import React from "react";
import Card from "./Card";
import { action } from "@storybook/addon-actions";

export default {
  component: Card,
  title: "PictureMatch/Board/Card",
  excludeStories: /.*Data$/,
};

const pictureKnobs = () => {
  return {
    r: Math.floor(Math.random() * 360),
    s: 0.5 + Math.floor(Math.random() * 50) / 100,
    x: Math.floor(Math.random() * 240),
    y: Math.floor(Math.random() * 240),
  };
};

export const Default = () => (
  <Card
    card={{
      pictures: Array(8)
        .fill()
        .map((item, idx) => idx),
      layout: 0,
    }}
    style="color"
    handleClick={action("handleClick")}
  />
);

export const DevOnlyLayoutDesignSmall = () => {
  const customLayout = [
    pictureKnobs(),
    pictureKnobs(),
    pictureKnobs(),
    pictureKnobs(),
    pictureKnobs(),
    pictureKnobs(),
  ];

  return (
    <div>
      <Card
        card={{
          pictures: [0, 1, 2, 3, 4, 5],
          layout: 0,
          rotation: 0,
        }}
        style="color"
        customLayout={customLayout}
        handleClick={action("handleClick")}
      />
      <p>{JSON.stringify(customLayout)}</p>
    </div>
  );
};

export const DevOnlyLayoutDesignMedium = () => {
  const customLayout = [
    pictureKnobs(),
    pictureKnobs(),
    pictureKnobs(),
    pictureKnobs(),
    pictureKnobs(),
    pictureKnobs(),
    pictureKnobs(),
    pictureKnobs(),
  ];

  return (
    <div>
      <Card
        card={{
          pictures: [0, 1, 2, 3, 4, 5, 6, 7],
          layout: 0,
          rotation: 0,
        }}
        style="color"
        customLayout={customLayout}
        handleClick={action("handleClick")}
      />
      <p>{JSON.stringify(customLayout)}</p>
    </div>
  );
};
