import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { Button, Icon, Container, Confirm } from "semantic-ui-react";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { intersection, pickBy, identity, find, some, keys, map } from "lodash";

import { API_ROOT } from "config/api";
import { routes } from "config/routes";
import { gameComponents } from "games";
import { useUser, useCredentials } from "contexts/UserContext";
import { getUrlParam } from "utils/url";
import DataStore from "services/DataStore";
import { apiRequests } from "services/API";
import { useTranslation } from "react-i18next";

import { BoardGameProvider } from "contexts/BoardGameContext";
import Loading from "components/game/Loading";
import Layout from "components/layout/Layout";

const GamePage = () => {
  const history = useHistory();
  const { gameID, gameName } = useParams();
  const { t } = useTranslation("lobby");

  const [error, setError] = useState();
  const [playerID, setPlayerID] = useState();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const user = useUser();
  const credentials = useCredentials();
  const gameCredentials = credentials && credentials[gameID];

  const { game, Board } = gameComponents.find((gc) => gc.game.name === gameName);

  const fetchPlayerID = useCallback(() => {
    apiRequests
      .fetchRoom(gameName, gameID)
      .then((room) => {
        const player = room.players.find((player) => player.name === user.uid);
        setPlayerID(player.id.toString());
      })
      .catch(() => {
        setError("errors.no_game");
      });
  }, [gameName, gameID, user, setPlayerID, setError]);

  const detectCurrentGames = useCallback(() => {
    const currentCredentials = pickBy(credentials, identity);
    apiRequests
      .fetchRooms([game])
      .then((rooms) => {
        const roomsWithUser = rooms.filter((room) => find(room.players, { name: user.uid }));
        const currenRooms = intersection(keys(currentCredentials), map(roomsWithUser, "gameID"));
        if (currenRooms.length > 0) {
          setError("errors.already_in_game");
        } else {
          DataStore.setCredentials({});
        }
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [credentials, game, user, setError]);

  const joinGame = useCallback(() => {
    let freeSeat;
    apiRequests
      .fetchRoom(gameName, gameID)
      .then((room) => {
        freeSeat = room.players.find((p) => !p.name);
        if (!freeSeat) throw new Error("errors.no_space");
        return apiRequests.joinRoom(gameName, gameID, freeSeat.id.toString(), user.uid);
      })
      .then(async ({ playerCredentials }) => {
        setPlayerID(freeSeat.id.toString());
        await DataStore.addCredentials(user.uid, gameID, playerCredentials);
      })
      .catch((e) => {
        setError(e.message || "errors.no_space");
      });
  }, [gameName, gameID, user, setPlayerID, setError]);

  useEffect(() => {
    if (playerID || !gameName || !gameID || !user || !credentials) return;

    if (gameCredentials) {
      fetchPlayerID();
    } else if (some(credentials, identity)) {
      detectCurrentGames();
    } else {
      joinGame();
    }
  }, [
    playerID,
    gameName,
    gameID,
    user,
    credentials,
    gameCredentials,
    setPlayerID,
    fetchPlayerID,
    detectCurrentGames,
    joinGame,
  ]);

  const handleLeave = () => {
    apiRequests
      .leaveGame(game.name, gameID, playerID, gameCredentials)
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
    board: BoardGameProvider,
    loading: Loading,
    multiplayer: SocketIO({ server: API_ROOT }),
    debug: document.location.hostname === "localhost" && getUrlParam("debug") === "true",
  });

  return (
    <Layout>
      {error && <Redirect pass to={{ pathname: routes.lobby(), state: { error: error } }} />}
      {gameName && gameID && playerID && gameCredentials && (
        <>
          <NewGameClient playerID={playerID} gameID={gameID} credentials={gameCredentials}>
            <Board />
          </NewGameClient>
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
