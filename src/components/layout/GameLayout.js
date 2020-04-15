import React from "react";

import { string, func, node } from "prop-types";
import { Responsive, Segment, Container, Header, Grid } from "semantic-ui-react";
import Sidebar from "components/game/Sidebar";

const propTypes = {
  gameName: string.isRequired,
  handleActionClick: func,
  sidebarHeader: node,
};

const GameLayout = ({ gameName, handleActionClick, sidebarHeader, children }) => {
  return (
    <Container>
      <Segment basic>
        <Header as="h1" textAlign="center">
          {gameName}
        </Header>
      </Segment>
      <Responsive as={Grid} minWidth={Responsive.onlyComputer.minWidth}>
        <Grid.Column width="12">
          <Grid.Row>{children}</Grid.Row>
        </Grid.Column>
        <Grid.Column width="4">
          <Grid.Row>
            <Sidebar header={sidebarHeader} handleActionClick={handleActionClick} />
          </Grid.Row>
        </Grid.Column>
      </Responsive>
      <Responsive as={Grid} maxWidth={Responsive.onlyTablet.maxWidth}>
        <Grid.Row>
          <Grid.Column>{children}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Sidebar header={sidebarHeader} handleActionClick={handleActionClick} />
          </Grid.Column>
        </Grid.Row>
      </Responsive>
    </Container>
  );
};

GameLayout.propTypes = propTypes;

export default GameLayout;
