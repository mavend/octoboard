import React from "react";

import PropTypes from "prop-types";
import { Container, Grid, Image } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";

import Sidebar from "components/game/Sidebar";
import UserMenu from "components/user/UserMenu";
import MatchTypeBadge from "components/game/MatchTypeBadge";

import "react-toastify/dist/ReactToastify.css";
import styles from "./Layout.module.css";
import { Media } from "config/media";
import { StickyChat } from "components/game/Chat";

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
          <span>{privateMatch}</span>
          <MatchTypeBadge privateMatch={privateMatch} detailed />
          <UserMenu className={styles.userMenu} />
        </Container>
      </div>
      <Container>
        {header}
        <Grid as={Media} greaterThanOrEqual="computer">
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
        </Grid>
        <Grid as={Media} lessThan="computer">
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
        </Grid>
        <StickyChat />
        <ToastContainer toastClassName={styles.toast} position={toast.POSITION.TOP_CENTER} />
      </Container>
    </>
  );
};

GameLayout.propTypes = propTypes;
GameLayout.defaultProps = defaultProps;

export default GameLayout;
