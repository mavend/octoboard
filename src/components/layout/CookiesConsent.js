import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Message, Image } from "semantic-ui-react";
import { routes } from "config/routes";
import { useTranslation } from "react-i18next";

const CookiesConsent = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(localStorage.getItem("cookiesAgree") !== "true");

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem("cookiesAgree", "true");
  };

  if (!visible) return null;

  const styles = {
    message: {
      position: "fixed",
      width: "80vw",
      maxWidth: 1128,
      bottom: 60,
      margin: 0,
      left: "50%",
      transform: "translate(-50%, 0)",
      display: "flex",
      alignItems: "center",
    },
    icon: { width: 50, height: 50, marginRight: 20 },
  };

  return (
    <Message onDismiss={handleDismiss} style={styles.message} floating>
      <Image src="/images/cookie.png" alt="cookie" style={styles.icon} />
      <Message.Content>
        <Message.Header>{t("cookies.header")}</Message.Header>
        {t("cookies.content") + " "}
        <Link to={routes.privacy_policy()}>{t("cookies.privacy_policy")}</Link>
      </Message.Content>
    </Message>
  );
};

export default CookiesConsent;
