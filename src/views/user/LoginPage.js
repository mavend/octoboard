import React, { useContext, useState } from "react";
import { Modal, Form, Image, Header, Button, Message, Icon } from "semantic-ui-react";
import { UserContext } from "contexts/UserContext";
import { Link } from "react-router-dom";
import { routes } from "config/routes";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login, googleLogin } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (e) {
      const knownErrors = ["auth/invalid-email", "auth/wrong-password"];

      if (knownErrors.indexOf(e.code) >= 0) {
        setError(e.message);
      }
    }
  };

  return (
    <Modal open={true}>
      <Modal.Header>Login</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src="/images/game-hugo.png" />
        <Modal.Description>
          <Header>Login with your name</Header>
          <Form onSubmit={handleLogin} error={!!error}>
            <Message error content={error} />
            <Form.Input
              autoFocus
              type="email"
              autoComplete="username"
              maxLength="24"
              placeholder="Email"
              name="Email"
              value={email}
              onChange={(_, { value }) => setEmail(value)}
            />
            <Form.Input
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              name="Password"
              value={password}
              onChange={(_, { value }) => setPassword(value)}
            />
            <Form.Group>
              <Form.Button content="Login" />
            </Form.Group>
          </Form>
          <Link to={routes.register()}>
            <Button content="Register" />
          </Link>
          <Button onClick={googleLogin}>
            <Icon name={"google"} />
          </Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default LoginPage;
