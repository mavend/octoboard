import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header, Icon, Button, Modal } from "semantic-ui-react";
import { useBoardGame } from "contexts/BoardGameContext";

const GameRulesButton = () => {
  const { gameName } = useBoardGame();
  const { t } = useTranslation(["translation", "info"]);
  const [open, setOpen] = useState(false);

  const gameRulesArray = t(`info:games.${gameName.toLowerCase()}.description.rules`, {
    returnObjects: true,
  });
  const gameRulesContent =
    Array.isArray(gameRulesArray) &&
    gameRulesArray.map((paragraph, idx) => <p key={idx}>{paragraph}</p>);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer="blurring"
      size="small"
      centered={false}
      trigger={
        <Button
          disabled={!gameRulesContent || gameRulesContent.length === 0}
          icon
          labelPosition="left"
          color="blue"
        >
          <Icon name="info circle" />
          {t("game.rules.header")}
        </Button>
      }
    >
      <Header>
        <Icon color="blue" name="info circle" />
        {t("game.rules.header")}: {gameName}
      </Header>
      <Modal.Content scrolling>{gameRulesContent}</Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={() => setOpen(false)}>
          <Icon name="checkmark" /> {t("game.rules.confirm")}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default GameRulesButton;
