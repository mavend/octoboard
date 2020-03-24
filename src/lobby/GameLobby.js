import React from "react";
import { Container, Header, Image, Segment, Grid } from "semantic-ui-react";
import RoomsList from "./RoomsList";
import CreateRoomForm from "./CreateRoomForm";

const GameLobby = ({ rooms, gameComponents, joinRoom, createRoom }) => {
  const styles = {
    mainImage: {
      width: "300px",
      margin: "30px auto 0",
    },
    mainHeader: {
      marginTop: "20px",
      marginBottom: "40px",
    },
  };
  const games = gameComponents.map(g => g.game);

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
              {rooms.length > 0 ? (
                <RoomsList rooms={rooms} games={games} onJoinRoom={joinRoom} />
              ) : (
                <p>No rooms available...</p>
              )}
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
