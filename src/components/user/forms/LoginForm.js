/* eslint-disable react/prop-types */
import React from "react";
import { Form, Message } from "semantic-ui-react";
import { withTranslation } from "react-i18next";

const LoginForm = ({
  t,
  handleLoginFunc,
  isLoading,
  error,
  email,
  setEmail,
  password,
  setPassword,
  formValid,
}) => (
  <Form onSubmit={handleLoginFunc} loading={isLoading} error={!!error}>
    <Message error content={error} />
    <Form.Input
      autoFocus
      label={t("form.email")}
      type="email"
      autoComplete="username"
      maxLength="24"
      placeholder={t("form.email")}
      name={t("form.email")}
      value={email}
      onChange={(_, { value }) => setEmail(value)}
    />
    <Form.Input
      label={t("form.password")}
      placeholder={t("form.password")}
      type="password"
      autoComplete="current-password"
      name={t("form.password")}
      value={password}
      onChange={(_, { value }) => setPassword(value)}
    />
    <Form.Group>
      <Form.Button disabled={!formValid} color="green" content={t("actions.login")} />
    </Form.Group>
  </Form>
);

export default withTranslation("credentials")(LoginForm);
