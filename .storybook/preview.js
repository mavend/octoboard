import React from "react";
import { addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import "../src/i18n";

import "semantic-ui-css/semantic.min.css";
import "../src/index.css";

addDecorator((story) => <div style={{ padding: "20px" }}>{story()}</div>);

addDecorator(withKnobs);
