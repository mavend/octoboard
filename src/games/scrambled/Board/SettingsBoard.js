import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Header, Segment, Form } from "semantic-ui-react";
import { availableLaguages } from "../data/tiles";

import WaitingBoard from "components/game/WaitingBoard";

const propTypes = {
  onStartGame: PropTypes.func,
};
const SettingsBoard = ({ onStartGame }) => {
  const { t, i18n } = useTranslation("scrambled");

  const languages = availableLaguages.map((lang) => ({
    key: lang,
    value: lang.key,
    text: lang.name,
  }));
  const defaultLanguage = languages.find(({ value }) => value === i18n.language) || languages[0];
  const [language, setLanguage] = useState(defaultLanguage.value);

  return (
    <WaitingBoard onStartGame={() => onStartGame(language)}>
      <Segment compact>
        <Form>
          <Header>{t("game.settings.language")}</Header>
          <Form.Select
            options={languages}
            value={language}
            onChange={(e, { value }) => setLanguage(value)}
          />
        </Form>
      </Segment>
    </WaitingBoard>
  );
};
SettingsBoard.propTypes = propTypes;

export default React.memo(SettingsBoard);
