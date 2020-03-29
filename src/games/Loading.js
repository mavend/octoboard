import React from "react";
import { Container, Header, Icon, Message } from "semantic-ui-react";

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
            <Message.Header>Just one second</Message.Header>
            We are connecting you to the game lobby.
          </Message.Content>
        </Message>
      </Container>
    </div>
  );
};

export default Loading;
