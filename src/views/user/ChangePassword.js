import { useHistory } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Modal, Form, Image, Header, Message } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import { UserContext } from "contexts/UserContext";
import Layout from "components/layout/Layout";
import { routes } from "../../config/routes";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { t } = useTranslation();
  const { changePassword } = useContext(UserContext);
  const history = useHistory();

  const formValid = newPassword.length > 0;

  const handleChangePassword = async () => {
    try {
      setIsLoading(true);
      await changePassword(newPassword);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
    setIsLoading(false);
    setSuccess(t("change_password.success"));
  };

  return (
    <Layout>
      <Modal
        open={true}
        closeIcon
        onClose={() => {
          history.push(routes.lobby());
        }}
      >
        <Modal.Header>{t("change_password.title")}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src="/images/game-hugo.png" />
          <Modal.Description>
            <Header>{t("change_password.title")}</Header>
            <Form
              onSubmit={handleChangePassword}
              loading={isLoading}
              error={!!error}
              success={!!success}
            >
              <Message error content={error} />
              <Message success content={success} />
              <Form.Input
                placeholder={t("register.form.password")}
                type="password"
                autoComplete="current-password"
                name={t("register.form.password")}
                value={newPassword}
                onChange={(_, { value }) => setNewPassword(value)}
              />
              <Form.Group>
                <Form.Button
                  disabled={!formValid}
                  color="green"
                  content={t("change_password.prompt")}
                />
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </Layout>
  );
};

export default ChangePassword;
