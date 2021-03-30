import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Header, Form, Segment, Dropdown, Label } from "semantic-ui-react";

import WaitingBoard from "components/game/WaitingBoard";
import { phrasesSets } from "../data/phrases";
import moment from "moment";

const propTypes = {
  modes: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultMode: PropTypes.string,
  defaultTimePerTurn: PropTypes.number,
  onStartGame: PropTypes.func,
};

const SettingsBoard = ({ modes, defaultMode, defaultTimePerTurn, onStartGame }) => {
  const { t, i18n } = useTranslation("kalambury");

  const languages = phrasesSets.map((lang) => ({
    key: lang.key,
    value: lang.key,
    text: lang.name,
  }));
  const defaultLanguage = languages.find(({ value }) => value === i18n.language) || languages[0];

  const [gameMode, setGameMode] = useState(defaultMode);
  const [maxPoints, setMaxPoints] = useState(10);
  const [language, setLanguage] = useState(defaultLanguage.value);
  const [category, setCategory] = useState([]);
  const [timePerTurn, setTimePerTurn] = useState(defaultTimePerTurn);

  useEffect(() => {
    if (language) {
      setCategory([]);
    }
  }, [language, setCategory]);

  const categories = language
    ? phrasesSets
        .find(({ key }) => key === language)
        .categories.map((set) => ({
          key: set.key,
          value: set.key,
          text: set.name,
        }))
    : [];

  const handleStartGame = () => {
    onStartGame({
      gameMode,
      maxPoints,
      language,
      category,
      timePerTurn,
    });
  };

  const formatTime = (seconds) => {
    return moment.unix(seconds).format("m[min] ss[s]");
  };

  return (
    <WaitingBoard onStartGame={handleStartGame}>
      <Segment compact padded>
        <Form>
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
          <Header disabled={gameMode === "infinite"} style={{ marginBottom: 5 }}>
            {t("game.settings.maxPoints")} <Label size="large">{maxPoints}</Label>
          </Header>
          <Form.Input
            fluid
            type="range"
            min="1"
            max="50"
            step="1"
            disabled={gameMode === "infinite"}
            value={maxPoints}
            onChange={(e, { value }) => setMaxPoints(value)}
          />
          <Header style={{ marginBottom: 5 }}>
            {t("game.settings.timePerTurn")} <Label size="large">{formatTime(timePerTurn)}</Label>
          </Header>
          <Form.Input
            fluid
            type="range"
            min="30"
            max="600"
            step="10"
            value={timePerTurn}
            onChange={(e, { value }) => setTimePerTurn(value)}
          />
          <Header>{t("game.settings.language")}</Header>
          <Form.Select
            options={languages}
            value={language}
            onChange={(e, { value }) => setLanguage(value)}
          />
          <Header>{t("game.settings.category")}</Header>
          <Dropdown
            selection
            multiple
            fluid
            placeholder="All categories"
            options={categories}
            value={category}
            onChange={(e, { value }) => setCategory(value)}
            disabled={categories.length === 0}
          />
        </Form>
      </Segment>
    </WaitingBoard>
  );
};
SettingsBoard.propTypes = propTypes;

export default React.memo(SettingsBoard);
