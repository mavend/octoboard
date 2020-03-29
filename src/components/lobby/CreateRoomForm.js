import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import { apiRequests } from "services/API";
import { useTranslation } from "react-i18next";

const CreateRoomForm = ({ games }) => {
  const [game, setGame] = useState();
  const [players, setPlayers] = useState();
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

  const handleCreate = () => {
    if (game && players) {
      apiRequests.createRoom(game.name, players).then(() => {
        console.log("Game created!");
      });
    } else {
      alert("Not valid!");
    }
  };

  return (
    <Form onSubmit={handleCreate}>
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
      <Button fluid color="green" type="submit">
        {t("create.button")}
      </Button>
    </Form>
  );
};

export default CreateRoomForm;
