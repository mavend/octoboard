import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { isEqual } from "lodash";
import { Container, Header, Image, Segment, Grid, Dimmer, Loader, Label } from "semantic-ui-react";

import { routes } from "config/routes";
import { gameComponents } from "games";
import { apiRequests } from "services/API";
import { useUser } from "contexts/UserContext";
import { useTranslation } from "react-i18next";
import { PAGE_TITLE } from "config/constants";

import Layout from "components/layout/Layout";
import RoomsList from "components/lobby/RoomsList";
import CreateRoomForm from "components/lobby/CreateRoomForm";

const LobbyPage = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation("lobby");

  const user = useUser();
  const games = gameComponents.map((g) => g.game);

  const fetchRooms = useCallback(() => {
    apiRequests
      .fetchRooms(games)
      .then((rooms) => {
        const room = rooms.find((r) => r.players.find((p) => p.name === user.uid));
        if (room) {
          setCurrentRoom((currentRoom) => (isEqual(currentRoom, room) ? currentRoom : room));
        } else {
          setCurrentRoom();
        }
        rooms = rooms.filter((room) => room.setupData && !room.setupData.private);
        setRooms((currentRooms) => (isEqual(rooms, currentRooms) ? currentRooms : rooms));
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [games, setRooms, setLoading, user, setError, setCurrentRoom]);

  const handleJoinRoom = ({ gameName, gameID, players, playerID }) => {
    if (!currentRoom) {
      const freeSpotId = playerID || players.find((p) => !p.name).id;
      apiRequests
        .joinRoom(gameName, gameID, freeSpotId, user.uid)
        .then((response) => {
          setCurrentRoom(gameID);
          localStorage.setItem("playerCredentials", response.playerCredentials);
          history.push(routes.game(gameName, gameID));
        })
        .catch((e) => setError(e.message));
    } else {
      history.push(routes.game(gameName, gameID));
    }
  };

  const handleCreate = (gameName, players, gameOptions) => {
    if (!currentRoom && gameName && players) {
      setLoading(true);
      apiRequests
        .createRoom(gameName, players, gameOptions)
        .then(({ gameID }) => {
          history.push(routes.game(gameName, gameID));
          setLoading(false);
        })
        .catch((e) => setError(e.message));
    } else {
      alert("Not valid!");
    }
  };

  useEffect(() => {
    const { state } = location;
    if (state && state.error) {
      setError(state.error);
      history.replace({ state: { ...state, error: null } });
    }
  }, [location, history, setError]);

  useEffect(() => {
    fetchRooms();
    const interval = setInterval(fetchRooms, 2000);
    return () => clearInterval(interval);
  }, [fetchRooms]);

  const styles = {
    mainImage: {
      width: "300px",
      margin: "30px auto 0",
    },
    mainHeader: {
      marginTop: "20px",
      marginBottom: "40px",
    },
    noRoomImage: { margin: "0 auto" },
    error: {
      marginBottom: "10px",
    },
  };

  return (
    <Layout userMenu>
      <Container>
        <Image style={styles.mainImage} src="/images/game-hugo.png" />
        <Header as="h1" textAlign="center" style={styles.mainHeader}>
          {PAGE_TITLE}
          <Header.Subheader>{t("general.motto")}</Header.Subheader>
        </Header>
      </Container>
      {error && (
        <Container style={styles.error}>
          <Segment inverted color="red">
            <div>{error}</div>
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
      <Container>
        <Grid>
          <Grid.Column width="12">
            <Segment>
              <Header as="h3" textAlign="center">
                {t("list.title")}
              </Header>
              <div>
                {rooms.length > 0 || currentRoom ? (
                  <RoomsList
                    rooms={rooms}
                    games={games}
                    currentRoom={currentRoom}
                    onJoinRoom={handleJoinRoom}
                  />
                ) : (
                  <>
                    <Header as="h4" textAlign="center" color="grey">
                      {t("list.empty")}
                    </Header>
                    <Image style={styles.noRoomImage} src="/images/hugo-out.png" size="medium" />
                  </>
                )}
                {loading && (
                  <Dimmer active inverted>
                    <Loader inverted content={t("list.loading")} />
                  </Dimmer>
                )}
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column width="4">
            <Segment>
              <Header as="h3" textAlign="center">
                {t("create.title")}
              </Header>
              <CreateRoomForm
                loading={loading}
                games={games}
                onCreate={handleCreate}
                disabled={!!currentRoom}
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </Layout>
  );
};

export default LobbyPage;
