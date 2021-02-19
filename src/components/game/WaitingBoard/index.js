import React from "react";
import { Image, Icon, Segment, Button } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { useBoardGame } from "contexts/BoardGameContext";

const WaitingBoard = ({ onStartGame, children }) => {
  const {
    player: { canManageGame },
  } = useBoardGame();
  const { t } = useTranslation("kalambury");

  return (
    <>
      <Segment
        style={{
          background: "transparent",
          widht: 800,
          height: 600,
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
    </>
  );
};

export default WaitingBoard;
