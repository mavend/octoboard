import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Icon, Divider } from "semantic-ui-react";
import { routes } from "config/routes";
import { useTranslation } from "react-i18next";
import GoogleLoginOption from "./GoogleLogin";
import { Media } from "config/media";

const propTypes = {
  setError: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const OtherLoginOptions = ({ setError, setLoading }) => {
  const { t } = useTranslation("credentials");
  const location = useLocation();

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
      <Media greaterThanOrEqual="tablet">
        <Buttons />
      </Media>
      <Media lessThan="tablet">
        <Button.Group vertical fluid>
          <Buttons />
        </Button.Group>
      </Media>
    </>
  );
};
OtherLoginOptions.propTypes = propTypes;

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
OtherLoginOption.propTypes = {
  link: PropTypes.shape({
    link: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  current: PropTypes.bool,
};

export default OtherLoginOptions;
