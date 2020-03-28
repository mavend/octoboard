import React, { useState, useEffect } from "react";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Button, Icon, Container, Confirm } from "semantic-ui-react";
import Loading from "../Loading";
import { setUrlHash, getUrlParam } from "../utils/url";
import { ROOT_URL, leaveGameUrl } from "../api";

const GameClient = ({ gameComponent, playerID, gameID }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const credentials = localStorage.getItem("playerCredentials");

  useEffect(() => {
    setUrlHash(gameID);
    return () => setUrlHash(null);
  }, [gameID]);

  if (!gameComponent || !playerID) return null;
  const { game, board } = gameComponent;

  const handleLeave = () => {
    fetch(leaveGameUrl(game.name, gameID), {
      method: "POST",
      body: JSON.stringify({
        playerID: playerID,
        credentials: credentials,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      console.log("Game left!");
    });
  };

  const NewGameCLient = Client({
    game: game,
    board: board,
    loading: Loading,
    multiplayer: SocketIO({ ROOT_URL }),
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
          onConfirm={handleLeave}
        />
      </Container>
    </div>
  );
};

export default GameClient;
