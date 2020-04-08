import { string, arrayOf, shape, object, number } from "prop-types";

export const RoomType = shape({
  gameID: string.isRequired,
  gameName: string.isRequired,
  players: arrayOf(shape({ id: string.isRequired, name: string })).isRequired,
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
