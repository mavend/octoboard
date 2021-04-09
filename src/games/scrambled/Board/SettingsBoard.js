import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Header, Segment, Form } from "semantic-ui-react";

import { availableLaguages } from "../data/tiles";
import WaitingBoard from "components/game/WaitingBoard";

const propTypes = {
  assists: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultAssist: PropTypes.string.isRequired,
  StartGame: PropTypes.func.isRequired,
};
const SettingsBoard = ({ assists, defaultAssist, StartGame }) => {
  const { t, i18n } = useTranslation("scrambled");
  const languages = availableLaguages.map((lang) => ({
    key: lang.key,
    value: lang.key,
    text: lang.name,
  }));
  const defaultLanguage = languages.find(({ value }) => value === i18n.language) || languages[0];
  const [gameAssist, setGameAssist] = useState(defaultAssist);
  const [opponentPreview, setOpponentPreview] = useState(true);
  const [language, setLanguage] = useState(defaultLanguage.value);

  const onStartGame = useCallback(() => {
    StartGame(language, gameAssist, opponentPreview);
  }, [StartGame, gameAssist, language, opponentPreview]);

  return (
    <WaitingBoard onStartGame={onStartGame}>
      <Segment compact padded>
        <Form>
          <Header>{t("game.settings.language")}</Header>
          <Form.Select
            options={languages}
            value={language}
            onChange={(e, { value }) => setLanguage(value)}
          />
          <Header>{t("game.settings.assist")}</Header>
          {assists.map((assist) => (
            <Form.Field key={assist}>
              <Form.Radio
                toggle
                label={t(`game.settings.assists.${assist}`)}
                value={assist}
                checked={gameAssist === assist}
                onChange={(e, { value }) => setGameAssist(value)}
              />
            </Form.Field>
          ))}
          <Header>
            {t("game.settings.opponent_preview")}
            <Header.Subheader style={{ maxWidth: 260 }}>
              {t("game.settings.opponent_preview_details")}
            </Header.Subheader>
          </Header>
          <Form.Field>
            <Form.Checkbox
              toggle
              label={t(`game.settings.opponent_previews.${opponentPreview}`)}
              checked={opponentPreview}
              onChange={() => setOpponentPreview(!opponentPreview)}
            />
          </Form.Field>
        </Form>
      </Segment>
    </WaitingBoard>
  );
};

SettingsBoard.propTypes = propTypes;
export default React.memo(SettingsBoard);
