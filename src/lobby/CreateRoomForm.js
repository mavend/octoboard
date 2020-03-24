import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";

const CreateRoomForm = ({ games, onCreateRoom }) => {
  const [game, setGame] = useState();
  const [players, setPlayers] = useState();
  const [playersOptions, setPlayersOptions] = useState([]);

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
      const range = [...Array(maxPlayers - minPlayers + 1).keys()].map(i => i + minPlayers);
      setPlayersOptions(range.map(i => ({ key: i, value: i, text: i })));
      setPlayers(range[0]);
    }
  }, [game, setPlayersOptions, setPlayers]);

  const handleCreate = () => {
    if (game && players) {
      onCreateRoom(game, players);
    } else {
      alert("Not valid!");
    }
  };

  return (
    <Form>
      <Form.Select
        fluid
        label="Game"
        options={gamesOptions}
        value={game && game.name}
        onChange={(_, { value }) => setGame(games.find(g => g.name === value))}
      />
      <Form.Select
        label="Maximum number of players"
        options={playersOptions}
        value={players}
        onChange={(_, { value }) => setPlayers(value)}
      />
      <Button fluid color="green" onClick={handleCreate}>
        Create
      </Button>
    </Form>
  );
};

export default CreateRoomForm;
