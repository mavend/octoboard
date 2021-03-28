import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { Header, Segment, Form } from "semantic-ui-react";

import WaitingBoard from "components/game/WaitingBoard";

const propTypes = {
  t: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.object).isRequired,
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
  onStartGame: PropTypes.func.isRequired,
};
const SettingsBoard = ({ t, languages, language, setLanguage, onStartGame }) => (
  <WaitingBoard onStartGame={onStartGame}>
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

SettingsBoard.propTypes = propTypes;
export default withTranslation("scrambled")(React.memo(SettingsBoard));
