import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { eq, filter, find } from "lodash";
import { Container, Image, Segment, Label } from "semantic-ui-react";

import { routes } from "config/routes";
import DataStore from "services/DataStore";
import { lobbyClient } from "services/LobbyClient";
import { useUser } from "contexts/UserContext";
import { gameComponents } from "games";

import Layout from "components/layout/Layout";
import Lobby from "components/lobby/Lobby";

const propTypes = {
  noRefetch: PropTypes.bool,
};

const LobbyPage = ({ noRefetch }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation("lobby");
  const games = gameComponents.map((g) => g.game);
  const user = useUser();

  const {
    data: matchesData,
    error: matchesError,
    status,
    isFetching,
  } = useQuery("matches", () => lobbyClient.listAllMatches(games), {
    refetchInterval: noRefetch ? false : 1000,
  });

  useEffect(() => {
    if (isFetching) return;
    if (status === "error") {
      setError(matchesError);
    } else {
      const newMatches = filter(matchesData, { setupData: { private: false } });
      if (user) {
        const match = matchesData.find((r) => find(r.players, { name: user.uid }));
        if (match) {
          setCurrentMatch((currentMatch) => (eq(currentMatch, match) ? currentMatch : match));
        } else {
          setCurrentMatch();
        }
      }
      setMatches((matches) => (eq(matches, newMatches) ? matches : newMatches));
    }
    setLoading(false);
  }, [user, matchesData, matchesError, status, isFetching]);

  useEffect(() => {
    const { state } = location;
    if (state && state.error) {
      setError(t(state.error));
      navigate(location.pathname, { state: { ...state, error: null } });
    }
  }, [location, navigate, setError, t]);

  const handleJoinMatch = useCallback(
    ({ gameName, matchID, playerID }) => {
      if (!user) {
        navigate(routes.login_guest(), {
          state: { from: { pathname: routes.game(gameName, matchID) } },
        });
        return;
      }

      if (currentMatch) {
        navigate(routes.game(gameName, matchID));
        return;
      }

      setLoading(true);
      lobbyClient
        .joinMatch(gameName, matchID, { playerID, playerName: user.uid })
        .then(async ({ playerCredentials }) => {
          await DataStore.addCredentials(user.uid, matchID, playerCredentials);
          setLoading(false);
          navigate(routes.game(gameName, matchID));
        })
        .catch((e) => setError(e.message));
    },
    [user, currentMatch, setLoading, setError, navigate]
  );

  const handleCreate = useCallback(
    (gameName, numPlayers, gameOptions) => {
      if (!currentMatch && gameName && numPlayers && user) {
        setLoading(true);
        lobbyClient
          .createMatch(gameName, { numPlayers, setupData: gameOptions })
          .then(({ matchID }) => {
            handleJoinMatch({ gameName, matchID, playerID: "0" });
          })
          .catch((e) => setError(e.message));
      } else {
        alert("Not valid!");
      }
    },
    [user, currentMatch, setLoading, setError, handleJoinMatch]
  );

  const styles = {
    mainImage: {
      width: "300px",
      margin: "30px auto 30px",
    },
    mainHeader: {
      marginTop: "20px",
      marginBottom: "40px",
    },
    error: {
      marginBottom: "10px",
    },
  };

  return (
    <Layout>
      <Helmet>
        <title>Lobby | octoboard</title>
      </Helmet>
      <Container style={styles.header}>
        <Image style={styles.mainImage} src="/images/octoboard.svg" alt="octoboard logo" />
      </Container>
      {error && (
        <Container style={styles.error}>
          <Segment inverted color="red">
            <div>{t(error)}</div>
            <Label
              as="a"
              attached="top right"
              icon="close"
              color="red"
              onClick={() => setError()}
            />
          </Segment>
        </Container>
      )}
      <Lobby
        loggedIn={!!user}
        matches={matches}
        currentMatch={currentMatch}
        games={games}
        handleJoinMatch={handleJoinMatch}
        handleCreate={handleCreate}
        loading={loading}
      />
    </Layout>
  );
};
LobbyPage.propTypes = propTypes;

export default LobbyPage;
