import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Container, Image, Header, Segment } from "semantic-ui-react";

import Layout from "components/layout/Layout";
import { useTranslation } from "react-i18next";
import { Content } from "./Content";

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();

  const styles = {
    mainImage: {
      width: "300px",
      margin: "30px auto 30px",
    },
    mainHeader: {
      marginTop: "20px",
      marginBottom: "20px",
    },
    error: {
      marginBottom: "10px",
    },
  };

  return (
    <Layout hideUserMenu>
      <Helmet>
        <title>octoboards | {t("privacy_policy.title")}</title>
      </Helmet>
      <Container style={styles.header}>
        <Link className={styles.logo} to="/">
          <Image style={styles.mainImage} src="/images/octoboard.svg" alt="octoboard logo" />
        </Link>
      </Container>
      <Container>
        <Segment>
          <Header as="h1">{t("privacy_policy.title")}</Header>
          <Content lang={i18n.language} />
        </Segment>
      </Container>
    </Layout>
  );
};

export default PrivacyPolicy;
