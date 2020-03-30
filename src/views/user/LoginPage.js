import React, { useContext, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Modal, Form, Image, Header, Button, Message, Icon } from "semantic-ui-react";
import { UserContext } from "contexts/UserContext";
import { Link } from "react-router-dom";
import { routes } from "config/routes";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  const { login, googleLogin } = useContext(UserContext);

  const handleLogin = async (loginFunc) => {
    try {
      await loginFunc(email, password);
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (e) {
      const knownErrors = ["auth/invalid-email", "auth/wrong-password"];

      if (knownErrors.indexOf(e.code) >= 0) {
        setError(e.message);
      }
    }
  };

  return (
    <Modal open={true}>
      <Modal.Header>{t("login.title")}</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src="/images/game-hugo.png" />
        <Modal.Description>
          <Header>Login with your name</Header>
          <Form onSubmit={() => handleLogin(login)} error={!!error}>
            <Message error content={error} />
            <Form.Input
              autoFocus
              type="email"
              autoComplete="username"
              maxLength="24"
              placeholder="Email"
              name={t("register.form.email")}
              value={email}
              onChange={(_, { value }) => setEmail(value)}
            />
            <Form.Input
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              name={t("register.form.password")}
              value={password}
              onChange={(_, { value }) => setPassword(value)}
            />
            <Form.Group>
              <Form.Button content={t("login.actions.login")} />
            </Form.Group>
          </Form>
          <Link
            to={{
              pathname: routes.register(),
              state: { from: location.state },
            }}
          >
            <Button content={t("login.actions.register")} />
          </Link>
          <Button onClick={() => handleLogin(googleLogin)}>
            <Icon name={"google"} />
          </Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default LoginPage;
