import React from "react";

import PropTypes from "prop-types";
import { Container, Grid, Image } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

import Sidebar from "components/game/Sidebar";
import UserMenu from "components/user/UserMenu";
import MatchTypeBadge from "components/game/MatchTypeBadge";
import { StickyChat } from "components/game/Chat";

import "react-toastify/dist/ReactToastify.css";
import styles from "./Layout.module.css";

const propTypes = {
  gameName: PropTypes.string.isRequired,
  privateMatch: PropTypes.bool,
  header: PropTypes.node,
  actionsMapper: PropTypes.func,
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
  actionsMapper,
  sidebarHeader,
  extraPlayerContent,
  children,
  sidebarSize,
  showCurrentPlayer,
}) => {
  return (
    <>
      <Container>
        <MainMenu gameName={gameName} privateMatch={privateMatch} />
        <Container>{header}</Container>
        <Grid>
          <Grid.Column mobile={16} computer={16 - sidebarSize}>
            <Grid.Row>{children}</Grid.Row>
          </Grid.Column>
          <Grid.Column mobile={16} computer={sidebarSize}>
            <Grid.Row>
              <Sidebar
                header={sidebarHeader}
                actionsMapper={actionsMapper}
                extraPlayerContent={extraPlayerContent}
                showCurrentPlayer={showCurrentPlayer}
              />
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <StickyChat />
        <ToastContainer toastClassName={styles.toast} position={toast.POSITION.TOP_CENTER} />
      </Container>
    </>
  );
};
GameLayout.propTypes = propTypes;
GameLayout.defaultProps = defaultProps;

const MainMenu = React.memo(({ gameName, privateMatch }) => (
  <div className={styles.mainMenu}>
    <Container>
      <Link className={styles.logo} to="/">
        <Image src="/images/octoboard-small.svg" slt="Octoboard logo" />
      </Link>
      <span className={styles.gameName}>{gameName}</span>
      <MatchTypeBadge privateMatch={privateMatch} detailed />
      <UserMenu className={styles.userMenu} />
    </Container>
  </div>
));
MainMenu.displayName = "MainMenu";
MainMenu.propTypes = {
  gameName: PropTypes.string.isRequired,
  privateMatch: PropTypes.bool,
};

export default GameLayout;
