import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Button, Icon, Container, Confirm, Segment } from "semantic-ui-react";
import Loading from "components/game/Loading";
import { API_ROOT } from "config/api";
import { routes } from "config/routes";
import { gameComponents } from "games";
import { UserContext } from "contexts/UserContext";
import { getUrlParam } from "utils/url";
import { apiRequests } from "services/API";
import { useTranslation } from "react-i18next";

const GamePage = () => {
  const [error, setError] = useState();
  const [playerID, setPlayerID] = useState();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [credentials, setCredentials] = useState(localStorage.getItem("playerCredentials"));
  const { gameID, gameName } = useParams();
  const history = useHistory();
  const { t } = useTranslation("lobby");

  const { user } = useContext(UserContext);

  const { game, board } = gameComponents.find((gc) => gc.game.name === gameName);

  useEffect(() => {
    apiRequests
      .fetchRoom(game.name, gameID)
      .then((json) => {
        const player = json.players.find((player) => player.name === user.email);
        if (player) {
          setPlayerID(player.id.toString());
        } else {
          const freeSpot = json.players.find((p) => !p.name);
          if (freeSpot) {
            const freeSpotID = freeSpot.id.toString();
            apiRequests.joinRoom(game.name, gameID, freeSpotID, user.email).then((response) => {
              setPlayerID(freeSpotID);
              localStorage.setItem("playerCredentials", response.playerCredentials);
              setCredentials(response.playerCredentials);
            });
          } else {
            setError(t("errors.not_in_game"));
          }
        }
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  const handleLeave = () => {
    apiRequests
      .leaveGame(game.name, gameID, playerID, credentials)
      .then(() => {
        console.log("Game left!");
        history.push(routes.lobby());
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  const NewGameCLient = Client({
    game: game,
    board: board,
    loading: Loading,
    multiplayer: SocketIO({ server: API_ROOT }),
    debug: document.location.hostname === "localhost" && getUrlParam("debug") === "true",
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
              {t("game.leave")}
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

export default GamePage;
