import React from "react";
import { Link, useLocation } from "react-router-dom";
import { func } from "prop-types";
import { Button, Icon, Divider } from "semantic-ui-react";
import { routes } from "config/routes";
import { useTranslation } from "react-i18next";
import GoogleLoginOption from "./GoogleLogin";
import { Media } from "config/media";

const propTypes = {
  setError: func.isRequired,
  setLoading: func.isRequired,
};

const OtherLoginOptions = ({ setError, setLoading }) => {
  const { t } = useTranslation("credentials");
  let location = useLocation();

  const links = [
    { link: routes.login_guest(), icon: "user secret", text: t("actions.guest_login") },
    { link: routes.login(), icon: "sign-in", text: t("actions.login") },
    { link: routes.register(), icon: "signup", text: t("actions.register") },
  ];

  const Buttons = () => (
    <>
      {links.map((link) => (
        <OtherLoginOption current={link.link === location.pathname} link={link} key={link.link} />
      ))}
      <GoogleLoginOption setError={setError} setLoading={setLoading} />
    </>
  );

  return (
    <>
      <Divider />
      <Buttons as={Media} greaterThanOrEqual="tablet" />
      <Button.Group as={Media} lessThan="tablet" vertical fluid>
        <Buttons />
      </Button.Group>
    </>
  );
};

const OtherLoginOption = ({ link, current }) => {
  const location = useLocation();
  return (
    <Button
      as={Link}
      to={{
        pathname: link.link,
        state: location.state,
      }}
      disabled={current}
      basic={current}
      color={current ? "black" : null}
    >
      <Icon name={link.icon} />
      <span> {link.text}</span>
    </Button>
  );
};

OtherLoginOptions.propTypes = propTypes;

export default OtherLoginOptions;
