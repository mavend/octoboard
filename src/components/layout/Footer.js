import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Icon, Dropdown } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { breakpoints } from "config/media";
import { routes } from "config/routes";

const FooterLink = ({ text, children, ...props }) => (
  <a
    style={{ color: "#aaa", textDecoration: "underline dashed #ddd" }}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children || text}
  </a>
);
FooterLink.propTypes = { text: PropTypes.string };

const FooterItem = ({ children }) => {
  return <Menu.Item style={{ color: "#aaa" }}>{children}</Menu.Item>;
};

const Footer = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { key: "en", text: "English", value: "en" },
    { key: "pl", text: "polski", value: "pl" },
  ];

  const currentLanguage =
    languages.find(({ key }) => key === i18n.language.slice(0, 2)) || languages[0];

  const handleLanguageChange = (e, { value }) => {
    i18n.changeLanguage(value);
  };

  return (
    <Menu
      secondary
      stackable
      as="footer"
      style={window.innerWidth < breakpoints.tablet ? { padding: "0 1rem" } : {}}
    >
      <FooterItem>
        <FooterLink href="https://github.com/mavend/octoboard">
          <Icon name="github" />
          {t("footer.github")}
        </FooterLink>
      </FooterItem>
      <FooterItem>
        {t("footer.graphics")}: <FooterLink text="Icons8" href="https://icons8.com" />
      </FooterItem>
      <FooterItem>
        <Link
          to={routes.privacy_policy()}
          style={{ color: "#aaa", textDecoration: "underline dashed #ddd" }}
        >
          {t("privacy_policy.title")}
        </Link>
      </FooterItem>
      <Menu.Menu position="right">
        <FooterItem>
          <Icon size="large" name="language" style={{ marginRight: "8px" }} />
          <Dropdown
            pointing
            options={languages}
            defaultValue={currentLanguage.value}
            onChange={handleLanguageChange}
          />
        </FooterItem>
      </Menu.Menu>
    </Menu>
  );
};

export default Footer;
