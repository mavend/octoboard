export const PAGE_TITLE = "octoboard";
export const COLORS = [
  "#1b1c1d",
  "#db2828",
  "#ff8c21",
  "#ffd52b",
  "#21ba45",
  "#2185d0",
  "#a333c8",
  "#eb87bf",
  "#f4d0b5",
  "#a5673f",
];
// We don't override this for PR deploys because we don't know client url during build
// (we only know it after deploying to firebase)
// and making it work there just isn't worth the effort
export const CLIENT_URL = "https://octoboards.com";
