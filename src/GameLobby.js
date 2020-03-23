import React from 'react';
import { 
  Container,
  Header,
  Image,
  Segment,
  Grid,
  Button,
  Form,
} from "semantic-ui-react";
import RoomsList from "./RoomsList";
import CreateRoomForm from './CreateRoomForm';

const GAMES = [
  {id: "kalambury", name: "Kalambury", image: "/images/kalambury-icon.png"},
  {id: "tysiac", name: "Tysiąc", image: "/images/cards-girl-icon.png"},
]

const ROOMS = [
  {gameId: "kalambury", roomId: "503", description: "Patryk's room", currentPlayers: 3, maxPlayers: 10},
  {gameId: "kalambury", roomId: "1040", description: "", currentPlayers: 5, maxPlayers: 5},
  {gameId: "tysiac", roomId: "1040", description: "wbijać!", currentPlayers: 2, maxPlayers: 4},
  {gameId: "kalambury", roomId: "1030", description: "", currentPlayers: 3, maxPlayers: 10},
  {gameId: "tysiac", roomId: "1040", description: "wolne", currentPlayers: 2, maxPlayers: 4},
  {gameId: "kalambury", roomId: "1030", description: "", currentPlayers: 3, maxPlayers: 7},
  {gameId: "kalambury", roomId: "1040", description: "wbijać!", currentPlayers: 2, maxPlayers: 4},
  {gameId: "kalambury", roomId: "1030", description: "", currentPlayers: 3, maxPlayers: 10},
]

const GameLobby = (props) => {
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

  return (
    <div>
      <Container>
        <Image style={styles.mainImage} src="/images/game-hugo.png" />
        <Header as="h1" textAlign="center" style={styles.mainHeader}>
          Corona Games
          <Header.Subheader>
            Games in the time of plague
          </Header.Subheader>
        </Header>
      </Container>
      <Container>
        <Grid>
          <Grid.Column width="12">
            <Segment>
              <Header as="h3" textAlign="center">Available rooms</Header>
              <RoomsList rooms={ROOMS} games={GAMES} />
            </Segment>
          </Grid.Column>
          <Grid.Column width="4">
            <Segment>
              <Header as="h3" textAlign="center">Create room</Header>
              <CreateRoomForm games={GAMES} />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default GameLobby;