import React, { useContext, useState } from "react";
import {useHistory} from "react-router-dom";
import {Modal, Form, Image, Header, Message } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import { UserContext } from "contexts/UserContext";
import OtherLoginOptions from "components/user/LoginRedirections";
import handleAuthorization from "utils/user/handleAuthorization";


const AnonymousLoginPage = () => {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { logInAnonymously } = useContext(UserContext);
  const history = useHistory();

  const formValid = nickname.length > 0;
  const handleLoginFunc = handleAuthorization(() => logInAnonymously(nickname), setError, setIsLoading, history);

  return (
    <Modal open={true}>
      <Modal.Header>{t("guest.prompt")}</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src="/images/game-hugo.png" />
        <Modal.Description>
          <Header>{t("login.actions.guest_login")}</Header>
          <Form onSubmit={handleLoginFunc} loading={isLoading} error={!!error}>
            <Message error content={error} />
            <Form.Input
              autoFocus
              maxLength="24"
              placeholder={t("register.form.nickname")}
              name={t("register.form.nickname")}
              value={nickname}
              onChange={(_, { value }) => setNickname(value)}
            />
            <Form.Group>
              <Form.Button
                disabled={!formValid}
                color="green"
                content={t("login.actions.guest_login")}
              />
            </Form.Group>
          </Form>
          <OtherLoginOptions setError={setError} setLoading={setIsLoading}/>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default AnonymousLoginPage;
