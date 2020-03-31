import React from "react";
import { Container, Segment, Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const FooterLink = ({ text, children, ...props }) => (
  <a style={{ color: "#aaa" }} target="_blank" rel="noopener noreferrer" {...props}>
    {children || text}
  </a>
);

const FooterItem = ({ children }) => {
  return <div style={{ marginRight: "20px", color: "#aaa" }}>{children}</div>;
};

const Footer = () => {
  const { t } = useTranslation();

  const styles = {
    footer: {
      margin: 0,
      background: "none",
    },
    wrapper: {
      display: "flex",
      flexDirection: "row",
    },
  };

  return (
    <Segment as="footer" style={styles.footer}>
      <Container style={styles.wrapper}>
        <FooterItem>
          <FooterLink href="https://github.com/mavend/corona-games">
            <Icon name="github" />
            {t("footer.github")}
          </FooterLink>
        </FooterItem>
        <FooterItem>
          {t("footer.graphics")}: <FooterLink text="Icons8" href="https://icons8.com" />
        </FooterItem>
      </Container>
    </Segment>
  );
};

export default Footer;
