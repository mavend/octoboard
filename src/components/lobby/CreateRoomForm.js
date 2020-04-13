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

const CreateRoomForm = ({ games, onCreate, disabled, loading }) => {
  const [game, setGame] = useState(games[0]);
  const [players, setPlayers] = useState();
  const [privateRoom, setPrivateRoom] = useState(true);
  const [playersOptions, setPlayersOptions] = useState([]);
  const { t } = useTranslation("lobby");

  const gamesOptions = games.map(({ name, image }) => ({
    key: name,
    value: name,
    text: name,
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
    <Form onSubmit={() => onCreate(game.name, players, { private: privateRoom })} loading={loading}>
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
        label={t(`create.private.${privateRoom}`)}
        checked={privateRoom}
        onChange={(_, { checked }) => setPrivateRoom(checked)}
      />
      <Button fluid color="orange" type="submit" disabled={disabled}>
        {t("create.button")}
      </Button>
    </Form>
  );
};

CreateRoomForm.propTypes = propTypes;

export default CreateRoomForm;
