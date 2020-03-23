import React from "react";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import Loading from "../Loading";

const GameClient = ({ gameComponent, playerID, gameID, credentials }) => {
  if (!gameComponent || !playerID) return null;

  const { game, board } = gameComponent;

  const NewGameCLient = Client({
    game: game,
    board: board,
    loading: Loading,
    multiplayer: SocketIO({ server: "localhost:8000" }),
    debug: false,
  });

  return <NewGameCLient playerID={"" + playerID} gameID={gameID} credentials={credentials} />;
};

export default GameClient;
