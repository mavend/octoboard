import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Form, Image, Header, Message } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import { UserContext } from "contexts/UserContext";
import Layout from "components/layout/Layout";
import OtherLoginOptions from "components/user/LoginRedirections";
import handleAuthorization from "utils/user/handleAuthorization";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { t } = useTranslation();
  const { logIn } = useContext(UserContext);
  const history = useHistory();

  const formValid = email.length > 0 && password.length > 0;
  const handleLoginFunc = handleAuthorization(
    () => logIn(email, password),
    setError,
    setIsLoading,
    history
  );

  return (
    <Layout>
      <Modal open={true}>
        <Modal.Header>{t("login.title")}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src="/images/game-hugo.png" />
          <Modal.Description>
            <Header>{t("login.prompt")}</Header>
            <Form onSubmit={handleLoginFunc} loading={isLoading} error={!!error}>
              <Message error content={error} />
              <Form.Input
                autoFocus
                type="email"
                autoComplete="username"
                maxLength="24"
                placeholder={t("register.form.email")}
                name={t("register.form.email")}
                value={email}
                onChange={(_, { value }) => setEmail(value)}
              />
              <Form.Input
                placeholder={t("register.form.password")}
                type="password"
                autoComplete="current-password"
                name={t("register.form.password")}
                value={password}
                onChange={(_, { value }) => setPassword(value)}
              />
              <Form.Group>
                <Form.Button
                  disabled={!formValid}
                  color="green"
                  content={t("login.actions.login")}
                />
              </Form.Group>
            </Form>
            <OtherLoginOptions setError={setError} setLoading={setIsLoading} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </Layout>
  );
};

export default LoginPage;
