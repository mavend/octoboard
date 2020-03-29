import React, { useContext, useState } from "react";
import { Modal, Form, Image, Header, Message, Button, Icon } from "semantic-ui-react";
import { UserContext } from "contexts/UserContext";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);

  const { register, googleLogin } = useContext(UserContext);

  const handleRegister = async () => {
    try {
      if (password !== password2) {
        throw {
          code: "auth/password-mismatch",
          message: "Password mismatch",
        };
      }
      await register(email, password);
    } catch (e) {
      const knownErrors = [
        "auth/password-mismatch",
        "auth/email-already-in-use",
        "auth/weak-password",
      ];

      if (knownErrors.indexOf(e.code) >= 0) {
        setError(e.message);
      }
    }
  };

  return (
    <Modal open={true}>
      <Modal.Header>Register</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src="/images/game-hugo.png" />
        <Modal.Description>
          <Header>Login with your name</Header>
          <Form onSubmit={handleRegister} error={!!error}>
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
              name="Password"
              autoComplete="new-password"
              value={password}
              onChange={(_, { value }) => setPassword(value)}
            />
            <Form.Input
              placeholder="Repeat password"
              type="password"
              autoComplete="new-password"
              name="Repeat password"
              value={password2}
              onChange={(_, { value }) => setPassword2(value)}
            />
            <Form.Group>
              <Form.Button content="Register" />
            </Form.Group>
          </Form>
          <Button onClick={googleLogin}>
            <Icon name={"google"} />
          </Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default RegisterPage;
