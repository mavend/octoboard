import React, {useState, useEffect, useContext} from "react";
import { useParams, useHistory } from "react-router-dom";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Button, Icon, Container, Confirm, Segment } from "semantic-ui-react";
import Loading from "../Loading";
import { API_ROOT, leaveGameUrl, roomUrl } from "../api";
import { routes } from "../config/routes";
import { gameComponents } from "../games/Games";
import {UserContext} from "../contexts/UserContext";

const GameClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [playerID, setPlayerID] = useState();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { gameID, gameName } = useParams();
  const history = useHistory();

  const {user} = useContext(UserContext);
  const credentials = localStorage.getItem("playerCredentials");

  const { game, board } = gameComponents.find((gc) => gc.game.name === gameName);

  useEffect(() => {
    fetch(roomUrl(gameName, gameID))
      .then((response) => response.json())
      .then((json) => {
        const player = json.players.find((player) => player.name === user.email);
        if (player) {
          console.log("Found player", player);
          setPlayerID(player.id.toString());
        } else {
          setError("Player not in a game");
        }
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

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
      history.push(routes.lobby());
    });
  };

  const NewGameCLient = Client({
    game: game,
    board: board,
    loading: Loading,
    multiplayer: SocketIO({ server: API_ROOT }),
    debug: false,
  });

  return (
    <>
      {error && (
        <Container>
          <Segment inverted color="red">
            {error}
          </Segment>
        </Container>
      )}
      {gameName && gameID && playerID && (
        <>
          <NewGameCLient playerID={playerID} gameID={gameID} credentials={credentials} />
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
        </>
      )}
    </>
  );
};

export default GameClient;
