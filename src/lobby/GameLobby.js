import React, { useState, useEffect } from 'react';
import Cookies from 'react-cookies';
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
  const [error, setError] = useState();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    let cookie = Cookies.load('lobbyState') || {};
    const connection = LobbyConnection({
      server: lobbyServer,
      gameComponents,
      playerName,
      playerCredentials: cookie.credentialStore,
    });
    const updateRooms = async () => {
      await connection.refresh();
      setRooms(connection.rooms);
    }
    updateRooms();

    setLobbyConnection(connection);
  }, [lobbyServer, gameComponents, playerName])

  const games = gameComponents.map(g => g.game);

  const createRoom = async (game, numPlayers) => {
    try {
      await lobbyConnection.create(game.name, numPlayers);
      await lobbyConnection.refresh();
      setRooms(lobbyConnection.rooms);
      this.setState({});
    } catch (error) {
      setError(error.message);
    }
  }

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
              <RoomsList rooms={rooms} games={games} />
            </Segment>
          </Grid.Column>
          <Grid.Column width="4">
            <Segment>
              <Header as="h3" textAlign="center">Create room</Header>
              <CreateRoomForm games={games} onCreateRoom={createRoom} />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default GameLobby;