import React from "react";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Button, Icon, Container } from "semantic-ui-react";
import Loading from "../Loading";

const GameClient = ({ gameComponent, playerID, gameID, credentials, leaveGame }) => {
  if (!gameComponent || !playerID) return null;
  const { game, board } = gameComponent;

  const NewGameCLient = Client({
    game: game,
    board: board,
    loading: Loading,
    multiplayer: SocketIO({ server: "localhost:8000" }),
    debug: false,
  });

  return (
    <div>
      <NewGameCLient playerID={"" + playerID} gameID={gameID} credentials={credentials} />
      <Container>
        <Button color="red" onClick={() => leaveGame(game.name, gameID)}>
          <Icon name="close" />
          Leave game
        </Button>
      </Container>
    </div>
  );
};

export default GameClient;
