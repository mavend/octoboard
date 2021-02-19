import { createMedia } from "@artsy/fresnel";

export const breakpoints = {
  mobile: 0,
  wide_mobile: 660,
  tablet: 768,
  computer: 992,
};

const AppMedia = createMedia({
  breakpoints: breakpoints,
});

export const mediaStyle = AppMedia.createMediaStyle();
export const { Media, MediaContextProvider } = AppMedia;
