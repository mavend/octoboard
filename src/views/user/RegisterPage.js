import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Form, Image, Header, Message } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import { UserContext } from "contexts/UserContext";
import Layout from "components/layout/Layout";
import OtherLoginOptions from "components/user/LoginRedirections";
import handleAuthorization from "utils/user/handleAuthorization";

const RegisterPage = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { register } = useContext(UserContext);
  const history = useHistory();

  const formValid = nickname.length > 0 && email.length > 0 && password.length > 0;
  const handleRegisterFunc = handleAuthorization(
    () => register(nickname, email, password),
    setError,
    setIsLoading,
    history
  );

  return (
    <Layout>
      <Modal open={true}>
        <Modal.Header>{t("register.title")}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src="/images/game-hugo.png" />
          <Modal.Description>
            <Header>{t("register.prompt")}</Header>
            <Form onSubmit={handleRegisterFunc} loading={isLoading} error={!!error}>
              <Message error content={error} />
              <Form.Input
                placeholder={t("register.form.nickname")}
                name={t("register.form.nickname")}
                value={nickname}
                onChange={(_, { value }) => setNickname(value)}
              />
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
                name={t("register.form.password")}
                autoComplete="new-password"
                value={password}
                onChange={(_, { value }) => setPassword(value)}
              />
              <Form.Group>
                <Form.Button
                  disabled={!formValid}
                  color="green"
                  content={t("register.form.submit")}
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

export default RegisterPage;
