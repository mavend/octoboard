import React, { useState, useEffect } from 'react';
import { 
  Container,
  Header,
  Image,
  Segment,
  Grid,
} from "semantic-ui-react";
import RoomsList from "./RoomsList";
import CreateRoomForm from './CreateRoomForm';
import LobbyConnection from "./LobbyConnection";

const GAMES = [
  {id: "kalambury", name: "Kalambury", image: "/images/kalambury-icon.png"},
  {id: "tysiac", name: "Tysiąc", image: "/images/cards-girl-icon.png"},
]

const ROOMS = [
  {gameId: "kalambury", roomId: "503", description: "Patryk's room", currentPlayers: 3, maxPlayers: 10},
  {gameId: "kalambury", roomId: "1040", description: "", currentPlayers: 5, maxPlayers: 5},
  {gameId: "tysiac", roomId: "104234", description: "wbijać!", currentPlayers: 2, maxPlayers: 4},
  {gameId: "kalambury", roomId: "1030", description: "", currentPlayers: 3, maxPlayers: 10},
  {gameId: "tysiac", roomId: "1041", description: "wolne", currentPlayers: 2, maxPlayers: 4},
  {gameId: "kalambury", roomId: "1031", description: "", currentPlayers: 3, maxPlayers: 7},
  {gameId: "kalambury", roomId: "1043", description: "wbijać!", currentPlayers: 2, maxPlayers: 4},
  {gameId: "kalambury", roomId: "1034", description: "", currentPlayers: 3, maxPlayers: 10},
]

const GameLobby = ({ lobbyServer, gameComponents, playerName }) => {
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

  const [lobbyConnection, setLobbyConnection] = useState();

  useEffect(() => {
    const connection = LobbyConnection({
      server: lobbyServer,
      gameComponents,
      playerName,
      playerCredentials: {},
    });
    setLobbyConnection(connection);
  }, [lobbyServer, gameComponents, playerName])

  const games = gameComponents.map(g => g.game);

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
              <CreateRoomForm games={games} />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default GameLobby;