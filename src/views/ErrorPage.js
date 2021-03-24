import React from "react";
import { Header, Container, Image, Button } from "semantic-ui-react";

const ErrorPage = () => (
  <Container textAlign="center" style={{ marginTop: 40 }}>
    <Header as="h1">Ups!</Header>
    <Header as="h2" size="medium">
      Something unexpected happened
    </Header>
    <Image size="large" centered src="/images/hugo-fatal-error.png" alt="Fatal error" />
    <Button color="green" as="a" href="/">
      Go back to the main page
    </Button>
  </Container>
);

export default ErrorPage;
