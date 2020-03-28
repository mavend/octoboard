import React from "react";
import { Container, Header, Image, Segment, Grid, Dimmer, Loader } from "semantic-ui-react";
import RoomsList from "./RoomsList";
import CreateRoomForm from "./CreateRoomForm";

const GameLobby = ({ loading, rooms, gameComponents, joinRoom, createRoom }) => {
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
  const games = gameComponents.map((g) => g.game);

  return (
    <div>
      <Container>
        <Image style={styles.mainImage} src="/images/game-hugo.png" />
        <Header as="h1" textAlign="center" style={styles.mainHeader}>
          Corona Games
          <Header.Subheader>Games in the time of plague</Header.Subheader>
        </Header>
      </Container>
      <Container>
        <Grid>
          <Grid.Column width="12">
            <Segment>
              <Header as="h3" textAlign="center">
                Available rooms
              </Header>
              <div>
                {rooms.length > 0 ? (
                  <RoomsList rooms={rooms} games={games} onJoinRoom={joinRoom} />
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
              <CreateRoomForm games={games} onCreateRoom={createRoom} />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default GameLobby;
