import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { isEqual, filter, find } from "lodash";
import { Container, Header, Image, Segment, Label } from "semantic-ui-react";

import { routes } from "config/routes";
import DataStore from "services/DataStore";
import { apiRequests } from "services/API";
import { useUser } from "contexts/UserContext";
import { PAGE_TITLE } from "config/constants";
import { gameComponents } from "games";

import Layout from "components/layout/Layout";
import Lobby from "components/lobby/Lobby";

const LobbyPage = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation("lobby");
  const games = gameComponents.map((g) => g.game);
  const user = useUser();

  const { data: roomsData, error: roomsError, status, isFetching } = useQuery(
    "rooms",
    () => apiRequests.fetchRooms(games),
    { refetchInterval: 1000 }
  );

  useEffect(() => {
    if (isFetching) return;
    if (status === "error") {
      setError(roomsError);
    } else {
      const newRooms = filter(roomsData, { setupData: { private: false } });
      const room = roomsData.find((r) => find(r.players, { name: user.uid }));
      if (room) {
        setCurrentRoom((currentRoom) => (isEqual(currentRoom, room) ? currentRoom : room));
      } else {
        setCurrentRoom();
      }
      setRooms((rooms) => (isEqual(rooms, newRooms) ? rooms : newRooms));
    }
    setLoading(false);
  }, [user.uid, roomsData, roomsError, status, isFetching]);

  useEffect(() => {
    const { state } = location;
    if (state && state.error) {
      setError(t(state.error));
      history.replace({ state: { ...state, error: null } });
    }
  }, [location, history, setError, t]);

  const handleJoinRoom = ({ gameName, gameID, players, playerID }) => {
    if (!currentRoom) {
      setLoading(true);
      const freeSpotId = playerID || players.find((p) => !p.name).id;
      apiRequests
        .joinRoom(gameName, gameID, freeSpotId, user.uid)
        .then(async (response) => {
          await DataStore.addCredentials(user.uid, gameID, response.playerCredentials);
          setLoading(false);
          history.push(routes.game(gameName, gameID));
        })
        .catch((e) => setError(e.message));
    } else {
      history.push(routes.game(gameName, gameID));
    }
  };

  const handleCreate = (gameName, numPlayers, gameOptions) => {
    if (!currentRoom && gameName && numPlayers) {
      setLoading(true);
      apiRequests
        .createRoom(gameName, numPlayers, gameOptions)
        .then(({ gameID }) => {
          handleJoinRoom({ gameName, gameID, playerID: "0" });
        })
        .catch((e) => setError(e.message));
    } else {
      alert("Not valid!");
    }
  };

  const styles = {
    mainImage: {
      width: "300px",
      margin: "30px auto 0",
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
    <Layout userMenu>
      <Container>
        <Image style={styles.mainImage} src="/images/octoboard.png" />
        <Header as="h1" textAlign="center" style={styles.mainHeader}>
          {PAGE_TITLE}
          <Header.Subheader>{t("general.motto")}</Header.Subheader>
        </Header>
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
        rooms={rooms}
        currentRoom={currentRoom}
        games={games}
        handleJoinRoom={handleJoinRoom}
        handleCreate={handleCreate}
        loading={loading}
      />
    </Layout>
  );
};

export default LobbyPage;
