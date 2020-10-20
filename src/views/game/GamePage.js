import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  const { matchID, gameName } = useParams();

  const [error, setError] = useState();
  const [playerID, setPlayerID] = useState();

  const user = useUser();
  const credentials = useCredentials();
  const gameCredentials = credentials && credentials[matchID];

  const { game, Board } = gameComponents.find((gc) => gc.game.name === gameName);

  const fetchPlayerID = useCallback(() => {
    apiRequests
      .fetchMatch(gameName, matchID)
      .then((match) => {
        const player = match.players.find((player) => player.name === user.uid);
        setPlayerID(player.id.toString());
      })
      .catch(() => {
        setError("errors.no_game");
      });
  }, [gameName, matchID, user, setPlayerID, setError]);

  const detectCurrentGames = useCallback(() => {
    const currentCredentials = pickBy(credentials, identity);
    apiRequests
      .fetchMatches([game])
      .then((matches) => {
        const matchesWithUser = matches.filter((match) => find(match.players, { name: user.uid }));
        const currenMatches = intersection(
          keys(currentCredentials),
          map(matchesWithUser, "matchID")
        );
        if (currenMatches.length > 0) {
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
      .fetchMatch(gameName, matchID)
      .then((match) => {
        freeSeat = match.players.find((p) => !p.name);
        if (!freeSeat) throw new Error("errors.no_space");
        return apiRequests.joinMatch(gameName, matchID, freeSeat.id.toString(), user.uid);
      })
      .then(async ({ playerCredentials }) => {
        setPlayerID(freeSeat.id.toString());
        await DataStore.addCredentials(user.uid, matchID, playerCredentials);
      })
      .catch((e) => {
        setError(e.message || "errors.no_space");
      });
  }, [gameName, matchID, user, setPlayerID, setError]);

  useEffect(() => {
    if (playerID || !gameName || !matchID || !user || !credentials) return;

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
    matchID,
    user,
    credentials,
    gameCredentials,
    setPlayerID,
    fetchPlayerID,
    detectCurrentGames,
    joinGame,
  ]);

  const NewGameClient = useMemo(
    () =>
      Client({
        game: game,
        board: BoardGameProvider,
        loading: Loading,
        multiplayer: SocketIO({ server: API_ROOT }),
        debug: document.location.hostname === "localhost" && getUrlParam("debug") === "true",
      }),
    [game]
  );

  return (
    <Layout hideUserMenu>
      <Helmet>
        <title>
          {gameName} [{matchID}] | octoboard
        </title>
      </Helmet>
      {error && <Redirect pass to={{ pathname: routes.lobby(), state: { error: error } }} />}
      {gameName && matchID && playerID && gameCredentials && (
        <>
          <NewGameClient
            playerID={playerID}
            matchID={matchID}
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
