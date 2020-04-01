import { Link, useLocation } from "react-router-dom";
import { routes } from "../../config/routes";
import { Button, Divider, Icon } from "semantic-ui-react";
import React from "react";
import { useTranslation } from "react-i18next";
import GoogleLoginOption from "./GoogleLogin";

const OtherLoginOptions = ({ setError, setLoading }) => {
  const { t } = useTranslation("credentials");
  let location = useLocation();

  const links = [
    { link: routes.login(), icon: "sign-in", text: t("actions.login") },
    { link: routes.register(), icon: "signup", text: t("actions.register") },
    { link: routes.login_guest(), icon: "user secret", text: t("actions.guest_login") },
  ];

  return (
    <>
      <Divider />
      {links.map((link) => {
        if (link.link !== location.pathname)
          return <OtherLoginOption link={link} key={link.link} />;
        return null;
      })}
      <GoogleLoginOption setError={setError} setLoading={setLoading} />
    </>
  );
};

const OtherLoginOption = ({ link }) => {
  const location = useLocation();
  return (
    <Link
      to={{
        pathname: link.link,
        state: location.state,
      }}
    >
      <Button>
        <Icon name={link.icon} />
        <span> {link.text}</span>
      </Button>
    </Link>
  );
};

export default OtherLoginOptions;
