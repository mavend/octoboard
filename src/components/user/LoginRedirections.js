import { Link, useLocation } from "react-router-dom";
import { routes } from "../../config/routes";
import { Button, Icon, Responsive, Divider } from "semantic-ui-react";
import React from "react";
import { useTranslation } from "react-i18next";
import GoogleLoginOption from "./GoogleLogin";

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
      <Responsive minWidth={Responsive.onlyTablet.minWidth} as={Buttons} />
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Button.Group vertical fluid>
          <Buttons />
        </Button.Group>
      </Responsive>
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
      color={current && "black"}
    >
      <Icon name={link.icon} />
      <span> {link.text}</span>
    </Button>
  );
};

export default OtherLoginOptions;
