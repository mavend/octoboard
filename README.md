![Octoboard](https://github.com/mavend/octoboard/workflows/octoboard/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/866fc714-bea9-443b-920b-3d50c022710e/deploy-status)](https://app.netlify.com/sites/corona-games/deploys)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Octoboard

This is a collection of games that may help you and your friends kill the boredom of COVID19 quarantine.

## Development

Install dependencies `npm install`.

Run react dev server with `npm start`.

Run game server with: `node -r esm src/server.js`.

Setting `debug=true` in URL query will show debug overlay.

We also have some storybooks. See them with `npm run storybook`.

## Note

This project uses the [boardgame.io](https://boardgame.io) framework which is open source game engine for turn-based games.
Licensed under [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/).
