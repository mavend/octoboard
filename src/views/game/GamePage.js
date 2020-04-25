import React, { useState, useEffect, useCallback } from "react";
import { useParams, Redirect } from "react-router-dom";
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

import { BoardGameProvider } from "contexts/BoardGameContext";
import Loading from "components/game/Loading";
import Layout from "components/layout/Layout";

import { Helmet } from "react-helmet-async";

const GamePage = () => {
  const { gameID, gameName } = useParams();

  const [error, setError] = useState();
  const [playerID, setPlayerID] = useState();

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
          DataStore.setCredentials(user.uid, {});
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

  const NewGameClient = Client({
    game: game,
    board: BoardGameProvider,
    loading: Loading,
    multiplayer: SocketIO({ server: API_ROOT }),
    debug: document.location.hostname === "localhost" && getUrlParam("debug") === "true",
  });

  return (
    <Layout hideUserMenu>
      <Helmet>
        <title>
          {gameName} [{gameID}] | octoboard
        </title>
      </Helmet>
      {error && <Redirect pass to={{ pathname: routes.lobby(), state: { error: error } }} />}
      {gameName && gameID && playerID && gameCredentials && (
        <>
          <NewGameClient
            playerID={playerID}
            gameID={gameID}
            gameName={gameName}
            credentials={gameCredentials}
          >
            <Board />
          </NewGameClient>
        </>
      )}
    </Layout>
  );
};

export default GamePage;
