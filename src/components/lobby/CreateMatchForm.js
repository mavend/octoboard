import React, { useState, useEffect } from "react";
import { func, bool, arrayOf } from "prop-types";
import { useTranslation } from "react-i18next";
import { Button, Form } from "semantic-ui-react";
import { GameType } from "config/propTypes";

const propTypes = {
  games: arrayOf(GameType).isRequired,
  onCreate: func.isRequired,
  disabled: bool,
  loading: bool,
};

const CreateMatchForm = ({ games, onCreate, disabled, loading }) => {
  const [game, setGame] = useState(games[0]);
  const [players, setPlayers] = useState();
  const [privateMatch, setPrivateMatch] = useState(true);
  const [playersOptions, setPlayersOptions] = useState([]);
  const { t } = useTranslation("lobby");

  const gamesOptions = games.map(({ name, displayName, image }) => ({
    key: name,
    value: name,
    text: displayName || name,
    image: { avatar: true, src: image },
  }));

  useEffect(() => {
    if (game) {
      const { minPlayers, maxPlayers } = game;
      const range = [...Array(maxPlayers - minPlayers + 1).keys()].map((i) => i + minPlayers);
      setPlayersOptions(range.map((i) => ({ key: i, value: i, text: i })));
      setPlayers(range[0]);
    }
  }, [game, setPlayersOptions, setPlayers]);

  return (
    <Form
      onSubmit={() => onCreate(game.name, players, { private: privateMatch })}
      loading={loading}
    >
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
      <Form.Checkbox
        toggle
        label={t(`create.private.${privateMatch}`)}
        checked={privateMatch}
        onChange={(_, { checked }) => setPrivateMatch(checked)}
      />
      <Button fluid color="orange" type="submit" disabled={disabled}>
        {t("create.button")}
      </Button>
    </Form>
  );
};

CreateMatchForm.propTypes = propTypes;

export default CreateMatchForm;
