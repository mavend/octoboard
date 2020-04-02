import React from "react";
import { Form, Message } from "semantic-ui-react";
import { withTranslation } from "react-i18next";

const GuestForm = ({ t, handleLoginFunc, isLoading, error, nickname, setNickname, formValid }) => (
  <Form onSubmit={handleLoginFunc} loading={isLoading} error={!!error}>
    <Message error content={error} />
    <Form.Input
      autoFocus
      maxLength="24"
      label={t("form.nickname")}
      placeholder={t("form.nickname")}
      name={t("form.nickname")}
      value={nickname}
      onChange={(_, { value }) => setNickname(value)}
    />
    <Form.Group>
      <Form.Button disabled={!formValid} color="green" content={t("actions.guest_login")} />
    </Form.Group>
  </Form>
);

export default withTranslation("credentials")(GuestForm);
