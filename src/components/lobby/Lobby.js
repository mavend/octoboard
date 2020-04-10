import React from "react";
import { func, bool, arrayOf } from "prop-types";
import {
  Container,
  Header,
  Image,
  Segment,
  Grid,
  Dimmer,
  Loader,
  Responsive,
  Button,
  Icon,
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GameType, RoomType } from "config/propTypes";
import { routes } from "config/routes";
import RoomsList from "components/lobby/RoomsList";
import CreateRoomForm from "components/lobby/CreateRoomForm";
import OctopusWrapper from "components/layout/OctopusWrapper";

const propTypes = {
  rooms: arrayOf(RoomType).isRequired,
  currentRoom: RoomType,
  games: arrayOf(GameType).isRequired,
  handleJoinRoom: func.isRequired,
  handleCreate: func.isRequired,
  loading: bool,
};

const Lobby = ({ rooms, currentRoom, games, handleJoinRoom, handleCreate, loading, loggedIn }) => {
  const { t } = useTranslation("lobby");

  const styles = {
    noRoomImage: { margin: "0 auto" },
  };

  const createRoomSegment = () => (
    <OctopusWrapper position="bottom-right" color="yellow" rotation="cw">
      <Segment>
        <Header as="h3" textAlign="center">
          {t("create.title")}
        </Header>
        <CreateRoomForm
          loading={loading}
          games={games}
          onCreate={handleCreate}
          disabled={!!currentRoom}
          loggedIn={loggedIn}
        />
      </Segment>
    </OctopusWrapper>
  );

  const loginSegment = () => (
    <OctopusWrapper position="bottom-right" color="yellow" rotation="cw">
      <Segment textAlign="center">
        <Header as="h3" textAlign="center">
          Come and play
        </Header>
        <Image src="/images/hugo-easy-money.png" />
        <Button as={Link} to={routes.login_guest()} color="orange">
          <Icon name="sign-in" />
          Login
        </Button>
      </Segment>
    </OctopusWrapper>
  );

  const roomsListSegment = () => (
    <OctopusWrapper rotation="ccw">
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
              loggedIn={loggedIn}
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
    </OctopusWrapper>
  );

  return (
    <Container>
      <Responsive as={Grid} minWidth={Responsive.onlyComputer.minWidth}>
        <Grid.Column width="12">{roomsListSegment()}</Grid.Column>
        <Grid.Column width="4">{loggedIn ? createRoomSegment() : loginSegment()}</Grid.Column>
      </Responsive>
      <Responsive as={Grid} maxWidth={Responsive.onlyTablet.maxWidth}>
        {!currentRoom && (
          <Grid.Row>
            <Grid.Column>{loggedIn ? createRoomSegment() : loginSegment()}</Grid.Column>
          </Grid.Row>
        )}
        <Grid.Row>
          <Grid.Column>{roomsListSegment()}</Grid.Column>
        </Grid.Row>
      </Responsive>
    </Container>
  );
};

Lobby.propTypes = propTypes;

export default Lobby;
