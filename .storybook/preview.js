import React, { Suspense } from "react";
import { addParameters, addDecorator } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withRouter } from "storybook-addon-react-router-v6";
import { HelmetProvider } from "react-helmet-async";
import UserContextMock from "./UserContextMock";
import { MediaContextProvider } from "config/media";
import "../src/i18n";

import "semantic-ui-css/semantic.min.css";
import "../src/index.css";

const queryClient = new QueryClient();

addDecorator(withRouter);
addDecorator((storyFn) => <Suspense fallback="Loading...">{storyFn()}</Suspense>);
addDecorator((storyFn) => <MediaContextProvider>{storyFn()}</MediaContextProvider>);
addDecorator((storyFn) => <HelmetProvider>{storyFn()}</HelmetProvider>);
addDecorator((storyFn) => <UserContextMock>{storyFn()}</UserContextMock>);
addDecorator((storyFn) => (
  <QueryClientProvider client={queryClient}>{storyFn()}</QueryClientProvider>
));
addDecorator((storyFn) => <Suspense fallback="Loading">{storyFn()}</Suspense>);

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

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
