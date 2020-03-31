import React from "react";
import { addParameters, addDecorator } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withKnobs } from "@storybook/addon-knobs";
import "../src/i18n";

import "semantic-ui-css/semantic.min.css";
import "../src/index.css";

addDecorator(withKnobs);

const customViewports = {
  kindleFire2: {
    name: "Low resolution laptop",
    styles: {
      width: "1366px",
      height: "720px",
    },
    type: "desktop",
  },
  kindleFireHD: {
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
