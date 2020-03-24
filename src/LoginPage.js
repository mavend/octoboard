import React, { useState } from "react";
import { Modal, Button, Input, Image, Header } from "semantic-ui-react";

const LoginPage = ({ open, playerName, onLogin }) => {
  const [name, setName] = useState(playerName);

  return (
    <Modal open={open}>
      <Modal.Header>Login</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src="/images/game-hugo.png" />
        <Modal.Description>
          <Header>Login with your name</Header>
          <Input type="text" value={name} onChange={(_, { value }) => setName(value)} />
          <Button color="green" disabled={!name} onClick={() => name && onLogin(name)}>
            Login
          </Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default LoginPage;
