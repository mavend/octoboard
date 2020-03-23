import React, { useState } from 'react';
import {
  Button,
  Form,
} from "semantic-ui-react";

const CreateRoomForm = ({ games }) => {
  const [game, setGame] = useState("kalambury");
  const [players, setPlayers] = useState(2);
  const [description, setDescription] = useState(2);

  const options = games.map(({ id, name, image }) => (
    {
      key: id,
      value: id,
      text: name,
      image: { avatar: true, src: image }
    }
  ));

  return (
    <Form>
      <Form.Select fluid
        label='Game'
        options={options} 
        value={game} 
        onChange={(e) => setGame(e.target.value)} />
      <Form.Input
        label="Number of players"
        type="number"
        value={players}
        onChange={(e) => setPlayers(e.target.value)} />
      <Form.Input
        label='Description'
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)} />
      <Button fluid color="green">Create</Button>
    </Form>
  )
};

export default CreateRoomForm;