import React from "react";

import { string, func, node } from "prop-types";
import { Responsive, Segment, Container, Header, Grid, Image } from "semantic-ui-react";
import Sidebar from "components/game/Sidebar";
import UserMenu from "components/user/UserMenu";
import RoomTypeBadge from "components/game/RoomTypeBadge";

import styles from "./Layout.module.css";

const propTypes = {
  gameName: string.isRequired,
  header: node,
  handleActionClick: func,
  extraPlayerContent: func,
  sidebarHeader: node,
};

const GameLayout = ({
  gameName,
  privateRoom,
  header,
  handleActionClick,
  sidebarHeader,
  extraPlayerContent,
  children,
}) => {
  return (
    <>
      <div className={styles.mainMenu}>
        <Container>
          <span className={styles.logo}>
            <Image src="/images/octoboard-small.svg" slt="Octoboard logo" />
          </span>
          <span className={styles.gameName}>{gameName}</span>
          <RoomTypeBadge privateRoom={privateRoom} detailed />
          <UserMenu className={styles.userMenu} />
        </Container>
      </div>
      <Container>
        {header || (
          <Segment basic>
            <Header as="h1" textAlign="center">
              {gameName}
            </Header>
          </Segment>
        )}
        <Responsive as={Grid} minWidth={Responsive.onlyComputer.minWidth}>
          <Grid.Column width="12">
            <Grid.Row>{children}</Grid.Row>
          </Grid.Column>
          <Grid.Column width="4">
            <Grid.Row>
              <Sidebar
                header={sidebarHeader}
                handleActionClick={handleActionClick}
                extraPlayerContent={extraPlayerContent}
              />
            </Grid.Row>
          </Grid.Column>
        </Responsive>
        <Responsive as={Grid} maxWidth={Responsive.onlyTablet.maxWidth}>
          <Grid.Row>
            <Grid.Column>{children}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Sidebar
                header={sidebarHeader}
                handleActionClick={handleActionClick}
                extraPlayerContent={extraPlayerContent}
              />
            </Grid.Column>
          </Grid.Row>
        </Responsive>
      </Container>
    </>
  );
};

GameLayout.propTypes = propTypes;

export default GameLayout;
