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
  const { players, guesses } = G;
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
    }
  }

  const handleGuessClick = (e) => {
    if (!isDrawing) {
      setGuess(e.target.textContent);
    }
  }

  const getUserGuesses = (guesses, _playerID) =>{
    return [...guesses].reverse().filter(({playerID}) => playerID === _playerID);
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
              <GuessingBoard previousUserGuesses={getUserGuesses(guesses, playerID)} guess={guess} setGuess={setGuess} {...{ G, ctx, moves }} />
            )}
            <Header as="h3" textAlign="centered" style={{marginTop: 0}}>2:00</Header>
          </Grid.Column>
          <Grid.Column width="4" style={{marginTop: "19px"}}>
            <KalamburySidebar handleGuessClick={handleGuessClick} getUserGuesses={getUserGuesses} {...{ G, ctx, playerID, moves }} />
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
      You are drawing!
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
  guess, setGuess,
  previousUserGuesses,
}) => {

  const sendGuess = () => {
    Guess(guess);
    setGuess("");
  }

  const handleEvokingLastAnswer = (e) => {
    if(e.key == 'ArrowUp' && previousUserGuesses.length > 0) {
      setGuess(previousUserGuesses[0].phrase);
      e.target.selectionStart = previousUserGuesses[0].phrase.length;
      e.target.selectionEnd = previousUserGuesses[0].phrase.length;
    }
  }

  const handleChange = (e) => {
    setGuess(e.target.value);
  }

  return (
    <>
      <Header as='h2' textAlign="center">
        You are guessing!
        <Header.Subheader>What's on the drawing?</Header.Subheader>
      </Header>
      <Form onSubmit={sendGuess}>
        <Input fluid
          icon='talk'
          iconPosition='left'
          placeholder='Your guess...'
          value={guess}
          onChange={handleChange}
          onKeyDown={handleEvokingLastAnswer}
          action={{
            content: "Guess",
            color: "orange",
            onClick: sendGuess
          }}
          style={{
            height: "41px"
          }}
        />
      </Form>
      <Drawing lines={drawing} />
    </>
  )
};

export default KalamburyBoard;
