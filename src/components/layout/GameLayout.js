import React from "react";

import PropTypes from "prop-types";
import { Responsive, Container, Grid, Image } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";

import Sidebar from "components/game/Sidebar";
import UserMenu from "components/user/UserMenu";
import MatchTypeBadge from "components/game/MatchTypeBadge";

import "react-toastify/dist/ReactToastify.css";
import styles from "./Layout.module.css";

const propTypes = {
  gameName: PropTypes.string.isRequired,
  privateMatch: PropTypes.bool,
  header: PropTypes.node,
  handleActionClick: PropTypes.func,
  extraPlayerContent: PropTypes.func,
  sidebarHeader: PropTypes.node,
  sidebarSize: PropTypes.number,
  showCurrentPlayer: PropTypes.bool,
};

const defaultProps = {
  privateMatch: false,
  header: null,
  sidebarSize: 4,
  showCurrentPlayer: true,
};

const GameLayout = ({
  gameName,
  privateMatch,
  header,
  handleActionClick,
  sidebarHeader,
  extraPlayerContent,
  children,
  sidebarSize,
  showCurrentPlayer,
}) => {
  return (
    <>
      <div className={styles.mainMenu}>
        <Container>
          <span className={styles.logo}>
            <Image src="/images/octoboard-small.svg" slt="Octoboard logo" />
          </span>
          <span className={styles.gameName}>{gameName}</span>
          <MatchTypeBadge privateMatch={privateMatch} detailed />
          <UserMenu className={styles.userMenu} />
        </Container>
      </div>
      <Container>
        {header}
        <Responsive as={Grid} minWidth={Responsive.onlyComputer.minWidth}>
          <Grid.Column width={16 - sidebarSize}>
            <Grid.Row>{children}</Grid.Row>
          </Grid.Column>
          <Grid.Column width={sidebarSize}>
            <Grid.Row>
              <Sidebar
                header={sidebarHeader}
                handleActionClick={handleActionClick}
                extraPlayerContent={extraPlayerContent}
                showCurrentPlayer={showCurrentPlayer}
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
                showCurrentPlayer={showCurrentPlayer}
              />
            </Grid.Column>
          </Grid.Row>
        </Responsive>
        <ToastContainer toastClassName={styles.toast} position={toast.POSITION.TOP_CENTER} />
      </Container>
    </>
  );
};

GameLayout.propTypes = propTypes;
GameLayout.defaultProps = defaultProps;

export default GameLayout;
