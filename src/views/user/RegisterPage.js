import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal, Form, Image, Header, Message, Button, Icon } from "semantic-ui-react";
import { routes } from "config/routes";
import { UserContext } from "contexts/UserContext";
import { useTranslation } from "react-i18next";
import Layout from "components/layout/Layout";

const RegisterPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const formValid = email.length > 0 && password.length > 0 && password === password2;

  const { register, googleLogin } = useContext(UserContext);

  const handleRegister = async () => {
    try {
      if (password !== password2) {
        const error = new Error("Password mismatch");
        error.code = "auth/password-mismatch";
        throw error;
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
    <Layout>
      <Modal open={true}>
        <Modal.Header>{t("register.title")}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src="/images/game-hugo.png" />
          <Modal.Description>
            <Header>{t("register.prompt")}</Header>
            <Form onSubmit={handleRegister} error={!!error}>
              <Message error content={error} />
              <Form.Input
                autoFocus
                type="email"
                autoComplete="email"
                placeholder="Email"
                name={t("register.form.email")}
                value={email}
                onChange={(_, { value }) => setEmail(value)}
              />
              <Form.Input
                placeholder="Password"
                type="password"
                name={t("register.form.password")}
                autoComplete="new-password"
                value={password}
                onChange={(_, { value }) => setPassword(value)}
              />
              <Form.Input
                placeholder="Repeat password"
                type="password"
                autoComplete="new-password"
                name={t("register.form.confirm_password")}
                value={password2}
                onChange={(_, { value }) => setPassword2(value)}
              />
              <Form.Group>
                <Form.Button
                  disabled={!formValid}
                  color="green"
                  content={t("register.form.submit")}
                />
              </Form.Group>
            </Form>
            <Link
              to={{
                pathname: routes.login(),
                state: location && location.state,
              }}
            >
              <Button content={t("login.actions.login")} />
            </Link>
            <Button onClick={googleLogin}>
              <Icon name="google" />
            </Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </Layout>
  );
};

export default RegisterPage;
