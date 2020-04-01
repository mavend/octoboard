import React from "react";
import { Form, Message } from "semantic-ui-react";
import { withTranslation } from "react-i18next";

const ChangePasswordForm = ({
  t,
  handleChangePassword,
  isLoading,
  error,
  success,
  newPassword,
  setNewPassword,
  formValid,
}) => (
  <Form onSubmit={handleChangePassword} loading={isLoading} error={!!error} success={!!success}>
    <Message error content={error} />
    <Message success content={success} />
    <Form.Input
      placeholder={t("form.password")}
      type="password"
      autoComplete="current-password"
      name={t("form.password")}
      value={newPassword}
      onChange={(_, { value }) => setNewPassword(value)}
    />
    <Form.Group>
      <Form.Button disabled={!formValid} color="green" content={t("actions.change_password")} />
    </Form.Group>
  </Form>
);

export default withTranslation("credentials")(ChangePasswordForm);
