import React, { useContext, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Modal, Form, Image, Header, Message, Button, Icon } from "semantic-ui-react";
import { UserContext } from "contexts/UserContext";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  const { register, googleLogin } = useContext(UserContext);

  const handleRegister = async () => {
    try {
      if (password !== password2) {
        const error = new Error("Password mismatch");
        error.code = "auth/password-mismatch";
        throw error;
      }
      await register(email, password);
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
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
              <Form.Button content={t("register.form.submit")} />
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
