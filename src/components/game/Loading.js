import React from "react";
import { Container, Icon, Message } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const Loading = () => {
  const styles = {
    mainContent: {
      marginTop: "20px",
      marginBottom: "40px",
    },
  };
  const { t } = useTranslation("lobby");

  return (
    <div>
      <Container text style={styles.mainContent}>
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
