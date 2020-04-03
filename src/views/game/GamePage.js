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
import DataStore from "services/DataStore";
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
    // When useEffects reloads we need to stop all
    // promises from executing by changing cancalled to true
    // TODO: wrap in usePromise custom hook
    let cancelled = false;
    if (!(game && gameID && user.uid)) return;

    const joinFreeSeat = (room, maxRetries = 3) => {
      const freeSeat = room.players.find((p) => !p.name);
      if (!freeSeat || maxRetries === 0) {
        setError(t("errors.no_space"));
        return;
      }

      const freeSeatID = freeSeat.id.toString();
      apiRequests
        .joinRoom(game.name, gameID, freeSeatID, user.uid)
        .then((response) => {
          localStorage.setItem("playerCredentials", response.playerCredentials);
          if (cancelled) return;
          setPlayerID(freeSeatID);
          setCredentials(response.playerCredentials);
        })
        .catch((e) => {
          if (cancelled) return;
          if (e.message.match(/^Player.*not available$/)) {
            console.warn(e.message, "Retrying...");
            joinFreeSeat(room, maxRetries - 1);
          } else {
            setError(e.message);
          }
        });
    };

    apiRequests
      .fetchRooms([game])
      .then((rooms) => {
        if (cancelled) return;

        const localCredentials = localStorage.getItem("playerCredentials");
        setCredentials(localCredentials);

        const room = rooms.find((room) => room.gameID === gameID);
        if (!room) {
          setError(t("errors.no_game"));
          return;
        }

        const player = room.players.find((player) => player.name === user.uid);
        if (player && localCredentials) {
          setPlayerID(player.id.toString());
          return;
        }

        const currentRoom = rooms.find((room) =>
          room.players.find((player) => player.name === user.uid)
        );
        if (currentRoom) {
          setError(t("errors.already_in_game"));
          return;
        }

        joinFreeSeat(room);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message);
      });

    return () => {
      cancelled = true;
    };
  }, [game, gameID, t, user.uid]);

  const handleLeave = () => {
    apiRequests
      .leaveGame(game.name, gameID, playerID, credentials)
      .then(async () => {
        await DataStore.deleteCredentials(user.uid, gameID);
        history.push(routes.lobby());
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  const NewGameClient = Client({
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
          <NewGameClient playerID={playerID} gameID={gameID} credentials={credentials} />
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
