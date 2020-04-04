import React from "react";
import {
  Container,
  Header,
  Image,
  Segment,
  Grid,
  Dimmer,
  Loader,
  Responsive,
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import RoomsList from "components/lobby/RoomsList";
import CreateRoomForm from "components/lobby/CreateRoomForm";

const Lobby = ({
  error,
  setError,
  rooms,
  currentRoom,
  games,
  handleJoinRoom,
  handleCreate,
  loading,
}) => {
  const { t } = useTranslation("lobby");

  const styles = {
    noRoomImage: { margin: "0 auto" },
  };

  const CreateRoomSegment = () => (
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
  );

  const RoomsListSegment = () => (
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
  );

  return (
    <Container>
      <Responsive as={Grid} minWidth={Responsive.onlyComputer.minWidth}>
        <Grid.Column width="12">
          <RoomsListSegment />
        </Grid.Column>
        <Grid.Column width="4">
          <CreateRoomSegment />
        </Grid.Column>
      </Responsive>
      <Responsive as={Grid} maxWidth={Responsive.onlyTablet.maxWidth}>
        {!currentRoom && (
          <Grid.Row>
            <Grid.Column>
              <CreateRoomSegment />
            </Grid.Column>
          </Grid.Row>
        )}
        <Grid.Row>
          <Grid.Column>
            <RoomsListSegment />
          </Grid.Column>
        </Grid.Row>
      </Responsive>
    </Container>
  );
};

export default Lobby;
