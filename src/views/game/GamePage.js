import React, { useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Button, Icon, Container, Confirm } from "semantic-ui-react";

import { API_ROOT } from "config/api";
import { routes } from "config/routes";
import { gameComponents } from "games";
import { useUser } from "contexts/UserContext";
import { getUrlParam } from "utils/url";
import { apiRequests } from "services/API";
import { useTranslation } from "react-i18next";

import Loading from "components/game/Loading";
import Layout from "components/layout/Layout";

const GamePage = () => {
  const [error, setError] = useState();
  const [playerID, setPlayerID] = useState();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [credentials, setCredentials] = useState(localStorage.getItem("playerCredentials"));
  const { gameID, gameName } = useParams();
  const history = useHistory();
  const { t } = useTranslation("lobby");

  const user = useUser();

  const { game, board } = gameComponents.find((gc) => gc.game.name === gameName);

  useEffect(() => {
    apiRequests
      .fetchRooms([game])
      .then((rooms) => {
        const room = rooms.find((room) => room.gameID === gameID);
        if (!room) {
          setError(t("errors.no_game"));
          return;
        }

        const player = room.players.find((player) => player.name === user.email);
        if (player) {
          setPlayerID(player.id.toString());
          return;
        }

        const currentRoom = rooms.find((room) =>
          room.players.find((player) => player.name === user.email)
        );
        if (currentRoom) {
          setError(t("errors.already_in_game"));
          return;
        }

        const freeSpot = room.players.find((p) => !p.name);
        if (!freeSpot) {
          setError(t("errors.no_space"));
          return;
        }

        const freeSpotID = freeSpot.id.toString();
        apiRequests.joinRoom(game.name, gameID, freeSpotID, user.email).then((response) => {
          setPlayerID(freeSpotID);
          localStorage.setItem("playerCredentials", response.playerCredentials);
          setCredentials(response.playerCredentials);
        });
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [game, gameID, t, user]);

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
    <Layout>
      {error && <Redirect pass to={{ pathname: routes.lobby(), state: { error: error } }} />}
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
    </Layout>
  );
};

export default GamePage;
