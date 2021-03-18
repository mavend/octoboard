import React from "react";
import PropTypes from "prop-types";
import { Image, Icon, Segment, Button } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { useBoardGame } from "contexts/BoardGameContext";

const propTypes = {
  onStartGame: PropTypes.func.isRequired,
};

const WaitingBoard = ({ onStartGame, children }) => {
  const {
    player: { canManageGame },
  } = useBoardGame();
  const { t } = useTranslation();

  return (
    <Segment
      basic
      textAlign="center"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {canManageGame ? (
        <>
          {children}
          <Button icon labelPosition="right" color="green" onClick={onStartGame}>
            {t("board.wait.actions.start")}
            <Icon name="pencil" />
          </Button>
        </>
      ) : (
        <Image src="/images/hugo-waiting.png" style={{ width: 400, margin: "0 auto" }} />
      )}
    </Segment>
  );
};
WaitingBoard.propTypes = propTypes;

export default WaitingBoard;
