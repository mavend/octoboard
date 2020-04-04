import React from "react";
import { addParameters, addDecorator } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withKnobs } from "@storybook/addon-knobs";
import StoryRouter from "storybook-react-router";
import "../src/i18n";

import "semantic-ui-css/semantic.min.css";
import "../src/index.css";

addDecorator(withKnobs);
addDecorator(StoryRouter());

const customViewports = {
  lowResLaptop: {
    name: "Low resolution laptop",
    styles: {
      width: "1366px",
      height: "720px",
    },
    type: "desktop",
  },
  highResDesktop: {
    name: "FullHD desktop",
    styles: {
      width: "1920px",
      height: "1000px",
    },
    type: "desktop",
  },
};

addParameters({
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      ...customViewports,
    },
  },
});
