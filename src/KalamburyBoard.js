import React, { useState } from "react";
import { Container, Header, Segment, Icon, Form, Input } from "semantic-ui-react";
import DrawArea from "./DrawArea";
import Drawing from "./Drawing";

const KalamburyBoard = ({ G, ctx, moves }) => {
  const { players } = G;
  const { activePlayers } = ctx;

  const playerId = Object.keys(players)[0];
  const playerData = players[playerId];

  const styles = {
    mainHeader: {
      marginTop: "20px",
      marginBottom: "30px",
    },
    mainContent: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "800px",
    },
    footer: {
      marginTop: "20px",
    }
  }

  return (
    <div>
      <Container>
        <Header as="h1" textAlign="center" style={styles.mainHeader}>
          <Icon name="pencil" /> Kalambury
        </Header>
      </Container>

      <Container style={styles.mainContent}>
        { activePlayers[playerId] === "draw" ? (
          <DrawingBoard playerData={playerData} {...{ G, ctx, moves }} />
        ) : (
          <GuessingBoard playerData={playerData} {...{ G, ctx, moves }} />
        )}

        <Segment textAlign="center" style={styles.footer}>
          PlayerId: {playerId}
        </Segment>
      </Container>
    </div>
  )
}

const DrawingBoard = ({
  G: { drawing },
  moves: { UpdateDrawing },
  playerData: { phrase }
}) => (
  <Container>
    <Header as='h2' textAlign="center">
      Your phrase
      <Header.Subheader>{phrase}</Header.Subheader>
    </Header>
    <DrawArea
      initialLines={drawing}
      onUpdate={lines => UpdateDrawing(lines)} />
  </Container>
);

const GuessingBoard = ({
  G: { drawing },
  moves: { Guess }
}) => {
  const [guess, setGuess] = useState("");

  const sendGuess = () => {
    Guess(guess);
    setGuess("");
  }

  const styles = {
    guessInput: {
      marginBottom: "20px",
    },
  }

  return (
    <Container>
      <Header as='h2' textAlign="center">Guess the phrase</Header>
      <Form onSubmit={sendGuess}>
        <Input fluid
          icon='talk' 
          iconPosition='left'
          placeholder='Your guess...'
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          action={{
            content: "Guess",
            color: "orange",
            onClick: sendGuess
          }}
          style={styles.guessInput} />
      </Form>
      <Drawing lines={drawing} />
    </Container>
  )
};

export default KalamburyBoard;
