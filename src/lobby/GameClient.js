import React, { useState, useEffect } from "react";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Button, Icon, Container, Confirm } from "semantic-ui-react";
import Loading from "../Loading";
import { setUrlHash, getUrlParam } from "../utils/url";

const GameClient = ({ gameComponent, server, playerID, gameID, credentials, leaveGame }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    setUrlHash(gameID);
    return () => setUrlHash(null);
  }, [gameID]);

  if (!gameComponent || !playerID) return null;
  const { game, board } = gameComponent;

  const NewGameCLient = Client({
    game: game,
    board: board,
    loading: Loading,
    multiplayer: SocketIO({ server }),
    debug: document.location.hostname === "localhost" && getUrlParam("debug") === "true",
  });

  return (
    <div>
      <NewGameCLient playerID={"" + playerID} gameID={gameID} credentials={credentials} />
      <Container style={{ marginTop: "20px" }}>
        <Button color="red" onClick={() => setConfirmOpen(true)}>
          <Icon name="close" />
          Leave game
        </Button>
        <Confirm
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => leaveGame(game.name, gameID)}
        />
      </Container>
    </div>
  );
};

export default GameClient;
