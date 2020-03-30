import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { isEqual } from "lodash";
import { Container, Header, Image, Segment, Grid, Dimmer, Loader } from "semantic-ui-react";
import { routes } from "config/routes";
import { gameComponents } from "games";
import { apiRequests } from "services/API";
import { useUser } from "contexts/UserContext";
import RoomsList from "components/lobby/RoomsList";
import CreateRoomForm from "components/lobby/CreateRoomForm";
import UserMenu from "components/user/UserMenu";
import { useTranslation } from "react-i18next";
import { PAGE_TITLE } from "config/constants";

const LobbyPage = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();
  const history = useHistory();
  const { t } = useTranslation("lobby");

  const user = useUser();
  const games = gameComponents.map((g) => g.game);

  const fetchRooms = useCallback(() => {
    apiRequests
      .fetchRooms(games)
      .then((rooms) => {
        setRooms((currentRooms) => (isEqual(rooms, currentRooms) ? currentRooms : rooms));
        const room = rooms.find((r) => r.players.find((p) => p.name === user.email));
        if (room) {
          setCurrentRoom((currentRoom) => (isEqual(currentRoom, room) ? currentRoom : room));
        } else {
          setCurrentRoom();
        }
        setLoading(false);
        setError();
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [games, setRooms, setLoading, user, setError, setCurrentRoom]);

  const handleJoinRoom = ({ gameName, gameID, players, playerID }) => {
    if (!currentRoom) {
      const freeSpotId = playerID || players.find((p) => !p.name).id;
      apiRequests.joinRoom(gameName, gameID, freeSpotId, user.email).then((response) => {
        setCurrentRoom(gameID);
        localStorage.setItem("playerCredentials", response.playerCredentials);
        history.push(routes.game(gameName, gameID));
      });
    } else {
      history.push(routes.game(gameName, gameID));
    }
  };

  const handleCreate = (gameName, players) => {
    if (gameName && players) {
      setLoading(true);
      apiRequests.createRoom(gameName, players).then(({ gameID }) => {
        handleJoinRoom({ gameName, gameID, playerID: "0" });
      });
    } else {
      alert("Not valid!");
    }
  };

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
  };

  return (
    <UserMenu>
      <div style={{ minHeight: "100vh" }}>
        <Container>
          <Image style={styles.mainImage} src="/images/game-hugo.png" />
          <Header as="h1" textAlign="center" style={styles.mainHeader}>
            {PAGE_TITLE}
            <Header.Subheader>{t("general.motto")}</Header.Subheader>
          </Header>
        </Container>
        {error && (
          <Container>
            <Segment inverted color="red">
              <div>{error}</div>
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
                  {rooms.length > 0 ? (
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
      </div>
    </UserMenu>
  );
};

export default LobbyPage;
