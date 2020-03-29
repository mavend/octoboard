import React, { useState, useEffect, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { isEqual } from "lodash";
import { Container, Header, Image, Segment, Grid, Dimmer, Loader } from "semantic-ui-react";
import RoomsList from "./RoomsList";
import CreateRoomForm from "./CreateRoomForm";
import { roomsUrl, joinRoomUrl } from "../api";
import { gameComponents } from "../games/Games";
import { routes } from "../config/routes";
import { UserContext } from "../contexts/UserContext";
import UserMenu from "../components/user/UserMenu";

const LobbyPage = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const history = useHistory();

  const { user } = useContext(UserContext);
  const games = gameComponents.map((g) => g.game);

  const fetchRooms = useCallback(() => {
    const urls = games.map((game) => roomsUrl(game.name));
    Promise.all(urls.map((url) => fetch(url).then((r) => r.json())))
      .then((responses) => {
        const rooms = responses
          .map((res, idx) =>
            res.rooms.map((room) => {
              return { ...room, gameName: games[idx].name };
            })
          )
          .flat();
        setRooms((currentRooms) => (isEqual(rooms, currentRooms) ? currentRooms : rooms));
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [games, setRooms, setLoading, setError]);

  const handleJoinRoom = (gameName, gameID, freeSpotId) => {
    fetch(joinRoomUrl(gameName, gameID), {
      method: "POST",
      body: JSON.stringify({
        playerID: freeSpotId,
        playerName: user.email,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem("playerCredentials", json.playerCredentials);
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
            Corona Games
            <Header.Subheader>Games in the time of plague</Header.Subheader>
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
                  Available rooms
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
                        No rooms available at the moment
                      </Header>
                      <Image style={styles.noRoomImage} src="/images/hugo-out.png" size="medium" />
                    </>
                  )}
                  {loading && (
                    <Dimmer active inverted>
                      <Loader inverted content="Loading rooms" />
                    </Dimmer>
                  )}
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column width="4">
              <Segment>
                <Header as="h3" textAlign="center">
                  Create room
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
