import React, { useState } from "react";
import { 
  Container,
  Header,
  Form,
  Input,
  Grid,
} from "semantic-ui-react";
import DrawArea from "./DrawArea";
import Drawing from "./Drawing";
import KalamburySidebar from "./KalamburySidebar";

const KalamburyBoard = ({ G, ctx, playerID, moves }) => {
  const { players } = G;
  const { activePlayers } = ctx;

  const [guess, setGuess] = useState("");
  const playerData = players[playerID];
  const isDrawing = activePlayers[playerID] === "draw";

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
    }
  }

  const handleGuessClick = (e) => {
    setGuess(e.target.textContent);
  }

  return (
    <div>
      <Container>
        <Header as="h1" textAlign="center" style={styles.mainHeader}>
          Kalambury
        </Header>
      </Container>
      <Container style={styles.mainContent}>
        <Grid>
          <Grid.Column width="12">
            { isDrawing ? (
              <DrawingBoard playerData={playerData} {...{ G, ctx, moves }} />
            ) : (
              <GuessingBoard playerData={playerData} guess={guess} setGuess={setGuess} {...{ G, ctx, moves }} />
            )}
          </Grid.Column>
          <Grid.Column width="4" style={{marginTop: isDrawing ? "19px" : "0"}}>
            <KalamburySidebar handleGuessClick={handleGuessClick} {...{ G, ctx, playerID, moves }} />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  )
}

const DrawingBoard = ({
  G: { drawing },
  moves: { UpdateDrawing },
  playerData: { phrase }
}) => (
  <>
    <Header as='h2' textAlign="center">
      Your phrase
      <Header.Subheader>{phrase}</Header.Subheader>
    </Header>
    <DrawArea
      initialLines={drawing}
      onUpdate={lines => UpdateDrawing(lines)} />
  </>
);

const GuessingBoard = ({
  G: { drawing },
  moves: { Guess },
  guess, setGuess
}) => {
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
    <>
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
    </>
  )
};

export default KalamburyBoard;
