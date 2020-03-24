import React, { useState } from "react";
import { Modal, Form, Image, Header } from "semantic-ui-react";

const LoginPage = ({ open, playerName, onLogin }) => {
  const [name, setName] = useState(playerName);

  const handleLogin = () => name && onLogin(name);

  return (
    <Modal open={open}>
      <Modal.Header>Login</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src="/images/game-hugo.png" />
        <Modal.Description>
          <Header>Login with your name</Header>
          <Form onSubmit={handleLogin}>
            <Form.Input
              type="text"
              maxLength="24"
              placeholder="Name..."
              value={name}
              onChange={(_, { value }) => setName(value)}
              action={{
                color: "green",
                content: "Login",
                disabled: !name,
                onClick: handleLogin,
              }}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default LoginPage;
