import { string, arrayOf, shape, object, number, bool, oneOfType } from "prop-types";

export const MatchType = shape({
  matchID: string.isRequired,
  gameName: string.isRequired,
  players: arrayOf(oneOfType([shape({ id: number.isRequired, name: string }), shape({})]))
    .isRequired,
  setupData: object,
});

export const GameType = shape({
  name: string.isRequired,
  image: string.isRequired,
});

export const LineType = shape({
  points: arrayOf(arrayOf(number)).isRequired,
  color: string.isRequired,
  width: number.isRequired,
});

export const PlayerType = shape({
  id: oneOfType([number, string]).isRequired,
  uid: string,
  isConnected: bool,
  profile: shape({
    displayName: string,
  }),
  stage: string,
  points: number,
  actions: arrayOf(object),
  isDrawing: bool,
  isWinning: bool,
  isYou: bool,
  isCurrentPlayer: bool,
  canManageGame: bool,
});
