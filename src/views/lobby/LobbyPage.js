import React, { useState, useEffect, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { isEqual } from "lodash";
import { Container, Header, Image, Segment, Grid, Dimmer, Loader } from "semantic-ui-react";
import { routes } from "config/routes";
import { gameComponents } from "games";
import { apiRequests } from "services/API";
import { UserContext } from "contexts/UserContext";
import RoomsList from "components/lobby/RoomsList";
import CreateRoomForm from "components/lobby/CreateRoomForm";
import UserMenu from "components/user/UserMenu";
import { useTranslation } from "react-i18next";
import { PAGE_TITLE } from "config/constants";

const LobbyPage = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const history = useHistory();
  const { t } = useTranslation("lobby");

  const { user } = useContext(UserContext);
  const games = gameComponents.map((g) => g.game);

  const fetchRooms = useCallback(() => {
    apiRequests
      .fetchRooms(games)
      .then((rooms) => {
        setRooms((currentRooms) => (isEqual(rooms, currentRooms) ? currentRooms : rooms));
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [games, setRooms, setLoading, setError]);

  const handleJoinRoom = (gameName, gameID, freeSpotId) => {
    apiRequests.joinRoom(gameName, gameID, freeSpotId, user.email).then((response) => {
      localStorage.setItem("playerCredentials", response.playerCredentials);
      history.push(routes.game(gameName, gameID));
    });
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
                      onJoinRoom={handleJoinRoom}
                      user={user}
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
                <CreateRoomForm games={games} />
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </UserMenu>
  );
};

export default LobbyPage;
