import React, { useEffect } from "react";
import { Container, Header, Image, Segment, Grid } from "semantic-ui-react";
import RoomsList from "./RoomsList";
import CreateRoomForm from "./CreateRoomForm";
import { useLobbyConnection } from "./lobby_connection";

const GameLobby = ({
  lobbyServer,
  gameComponents,
  playerName,
  playerCredentials,
  onUpdateCredentials,
  onUpdateGame,
}) => {
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

  const { rooms, credentials, error, createRoom, joinRoom } = useLobbyConnection({
    server: lobbyServer,
    gameComponents,
    playerName,
    playerCredentials: playerCredentials[playerName],
  });

  useEffect(() => {
    if (credentials) {
      onUpdateCredentials({ ...playerCredentials, [playerName]: credentials });
    }
  }, [credentials, onUpdateCredentials]);

  const handleCreate = async (game, numPlayers) => {
    const gameID = await createRoom(game, numPlayers);
    handleJoin(game.name, gameID, 0);
  };

  const handleJoin = async (gameName, gameID, freeSpotId) => {
    await joinRoom(gameName, gameID, freeSpotId);
    onUpdateGame({ gameName, gameID, playerID: "" + freeSpotId });
  };

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
                <RoomsList rooms={rooms} games={games} onJoinRoom={handleJoin} />
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
              <CreateRoomForm games={games} onCreateRoom={handleCreate} />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
      {error}
    </div>
  );
};

export default GameLobby;
