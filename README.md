![Octoboard](https://github.com/mavend/octoboard/workflows/octoboard/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/866fc714-bea9-443b-920b-3d50c022710e/deploy-status)](https://app.netlify.com/sites/corona-games/deploys)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Octoboard

This is a collection of games that may help you and your friends kill the boredom of COVID19 quarantine.

## Development

Install dependencies `npm install`. To run firebase emulator in development you also need to install Java Development Kit `jdk`.

Run development stack (react client, node server, firebase emulators, storybook) with `npm start`

Setting `debug=true` in URL query will show debug overlay.

### Running individual services

Sometimes you may want to run parts of application on their own. You can do this like this:

- Run firebase emulators with `npm run start:firebase`.
- Run react dev server with `npm run start:client`.
- Run game server with: `npm run start:server`.
- Run storybook wiht: `npm run start:storybook`.

## Note

This project uses the [boardgame.io](https://boardgame.io) framework which is open source game engine for turn-based games.
Licensed under [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/).
