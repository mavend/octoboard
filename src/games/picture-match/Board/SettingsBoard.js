import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Header, Image, Segment, Form } from "semantic-ui-react";

import WaitingBoard from "components/game/WaitingBoard";

const propTypes = {
  modes: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultMode: PropTypes.string,
  styles: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultStyle: PropTypes.string,
  defaultPicturesCount: PropTypes.number,
  onStartGame: PropTypes.func,
};

const SettingsBoard = ({
  modes,
  defaultMode,
  styles,
  defaultStyle,
  defaultPicturesCount,
  onStartGame,
}) => {
  const { t } = useTranslation("picture-match");

  const [gameMode, setGameMode] = useState(defaultMode);
  const [chosenStyle, setChosenStyle] = useState(defaultStyle);
  const [picturesCount, setPicturesCount] = useState(defaultPicturesCount);

  return (
    <WaitingBoard onStartGame={() => onStartGame(chosenStyle, gameMode, picturesCount)}>
      <Segment compact>
        <Form>
          <Header>{t("game.settings.style")}</Header>
          <Image.Group>
            {styles.map((style) => (
              <Image
                bordered
                key={style}
                style={{ cursor: "pointer", background: "white" }}
                src={`/images/games/picture-match/styles/${style}.png`}
                label={
                  chosenStyle === style
                    ? { as: "a", color: "green", corner: "left", icon: "check", size: "mini" }
                    : null
                }
                onClick={() => setChosenStyle(style)}
              />
            ))}
          </Image.Group>
          <Header>{t("game.settings.difficulty")}</Header>
          <Form.Field>
            <Form.Radio
              toggle
              label={t(`game.settings.difficulties.regular`)}
              value={8}
              checked={picturesCount === 8}
              onChange={(e, { value }) => setPicturesCount(8)}
            />
          </Form.Field>
          <Form.Field>
            <Form.Radio
              toggle
              label={t(`game.settings.difficulties.easy`)}
              value={6}
              checked={picturesCount === 6}
              onChange={(e, { value }) => setPicturesCount(6)}
            />
          </Form.Field>
          <Header>{t("game.settings.mode")}</Header>
          {modes.map((mode) => (
            <Form.Field key={mode}>
              <Form.Radio
                toggle
                label={t(`game.settings.modes.${mode}`)}
                value={mode}
                checked={gameMode === mode}
                onChange={(e, { value }) => setGameMode(value)}
              />
            </Form.Field>
          ))}
        </Form>
      </Segment>
    </WaitingBoard>
  );
};
SettingsBoard.propTypes = propTypes;

export default React.memo(SettingsBoard);
