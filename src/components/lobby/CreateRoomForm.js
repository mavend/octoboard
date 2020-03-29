import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const CreateRoomForm = ({ games, onCreate, disabled, loading }) => {
  const [game, setGame] = useState();
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
    setGame(games[0]);
  }, [games, setGame]);

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
      <Button fluid color="green" type="submit" disabled={disabled}>
        {t("create.button")}
      </Button>
    </Form>
  );
};

export default CreateRoomForm;
