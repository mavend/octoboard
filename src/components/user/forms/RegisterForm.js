import React from "react";
import { Form, Message } from "semantic-ui-react";
import { withTranslation } from "react-i18next";

const RegisterForm = ({
  t,
  handleRegisterFunc,
  isLoading,
  error,
  nickname,
  setNickname,
  email,
  setEmail,
  password,
  setPassword,
  formValid,
}) => (
  <Form onSubmit={handleRegisterFunc} loading={isLoading} error={!!error}>
    <Message error content={error} />
    <Form.Input
      placeholder={t("form.nickname")}
      name={t("form.nickname")}
      value={nickname}
      onChange={(_, { value }) => setNickname(value)}
    />
    <Form.Input
      autoFocus
      type="email"
      autoComplete="username"
      maxLength="24"
      placeholder={t("form.email")}
      name={t("form.email")}
      value={email}
      onChange={(_, { value }) => setEmail(value)}
    />
    <Form.Input
      placeholder={t("form.password")}
      type="password"
      name={t("form.password")}
      autoComplete="new-password"
      value={password}
      onChange={(_, { value }) => setPassword(value)}
    />
    <Form.Group>
      <Form.Button disabled={!formValid} color="green" content={t("actions.submit")} />
    </Form.Group>
  </Form>
);

export default withTranslation("credentials")(RegisterForm);
