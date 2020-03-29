import React from "react";
import { Container, Header, Icon, Message } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const Loading = ({ G, ctx }) => {
  const styles = {
    mainHeader: {
      marginTop: "20px",
      marginBottom: "40px",
    },
    mainContent: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    footer: {
      marginTop: "20px",
    },
  };
  const { t } = useTranslation("lobby");

  return (
    <div>
      <Container>
        <Header as="h1" textAlign="center" style={styles.mainHeader}>
          Kalambury
        </Header>
      </Container>

      <Container style={styles.mainContent}>
        <Message icon>
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>{t("loading.header")}</Message.Header>
            {t("loading.subheader")}
          </Message.Content>
        </Message>
      </Container>
    </div>
  );
};

export default Loading;
