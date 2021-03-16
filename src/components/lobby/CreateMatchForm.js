import React, { useState, useEffect } from "react";
import { func, bool, arrayOf } from "prop-types";
import { useTranslation } from "react-i18next";
import { Button, Form, Popup, Icon } from "semantic-ui-react";
import { GameType } from "config/propTypes";
import { generateName } from "utils/generators/names";

const propTypes = {
  games: arrayOf(GameType).isRequired,
  onCreate: func.isRequired,
  disabled: bool,
  loading: bool,
};

const CreateMatchForm = ({ games, onCreate, disabled, loading }) => {
  const defaults = JSON.parse(localStorage.getItem("lastGame") || "{}");
  const defaultGame = games.find((g) => g.name === defaults.gameName) || games[0];

  const [game, setGame] = useState(defaultGame);
  const [players, setPlayers] = useState(defaults.players);
  const [privateMatch, setPrivateMatch] = useState(defaults.private ?? true);
  const [playersOptions, setPlayersOptions] = useState([]);
  const [name, setName] = useState();
  const { t, i18n } = useTranslation(["lobby", "info"]);

  const gamesOptions = games.map(({ name, displayName, image }) => ({
    key: name,
    value: name,
    text: displayName || name,
    description: (
      <Popup
        position="top right"
        offset={[14, 3]}
        content={t(`info:games.${name.toLowerCase()}.description.short`)}
        trigger={<Icon fitted color="grey" name="info circle" className="right floated" />}
      />
    ),
    image: { avatar: true, src: image },
  }));

  useEffect(() => {
    if (game) {
      const { minPlayers, maxPlayers } = game;
      const range = [...Array(maxPlayers - minPlayers + 1).keys()].map((i) => i + minPlayers);
      setPlayersOptions(range.map((i) => ({ key: i, value: i, text: i })));
      setPlayers((players) => (range.includes(players) ? players : range[0]));
    }
  }, [game, setPlayersOptions, setPlayers]);

  const onSubmit = () => {
    if (!disabled) {
      onCreate(game.name, players, { private: privateMatch, name });
      localStorage.setItem(
        "lastGame",
        JSON.stringify({ gameName: game.name, private: privateMatch, players })
      );
    }
  };

  return (
    <Form loading={loading}>
      <Form.Select
        fluid
        label={t("create.game_type")}
        options={gamesOptions}
        value={game && game.name}
        onChange={(_, { value }) => setGame(games.find((g) => g.name === value))}
      />
      <Form.Select
        fluid
        label={t("create.max_players")}
        options={playersOptions}
        value={players}
        onChange={(_, { value }) => setPlayers(value)}
      />
      <Form.Input
        fluid
        label={`${t("create.match_name")} (${t("create.optional")})`}
        value={name}
        onChange={(_, { value }) => setName(value)}
        placeholder={t("create.generate") + "..."}
        icon={<Icon name="sync" link onClick={() => setName(generateName(i18n.language))} />}
      />
      <Form.Checkbox
        toggle
        label={t(`create.private.${privateMatch}`)}
        checked={privateMatch}
        onChange={(_, { checked }) => setPrivateMatch(checked)}
      />
      <Button fluid color="orange" type="submit" disabled={disabled} onClick={onSubmit}>
        {t("create.button")}
      </Button>
    </Form>
  );
};

CreateMatchForm.propTypes = propTypes;

export default CreateMatchForm;
