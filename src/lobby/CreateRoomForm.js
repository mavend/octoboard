import React, { useState } from "react";
import {
  Button,
  Form,
} from "semantic-ui-react";

const CreateRoomForm = ({ games }) => {
  const [game, setGame] = useState("kalamabury");
  const [players, setPlayers] = useState(2);
  const [description, setDescription] = useState("");

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
        onChange={(_, { value }) => setGame(value)} />
      <Form.Input
        label="Number of players"
        type="number"
        value={players}
        onChange={(_, { value }) => setPlayers(value)} />
      <Form.Input
        label='Description'
        type='text'
        value={description}
        onChange={(_, { value }) => setDescription(value)} />
      <Button fluid color="green">Create</Button>
    </Form>
  )
};

export default CreateRoomForm;